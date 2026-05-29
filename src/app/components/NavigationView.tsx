import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Navigation, ChevronLeft, ChevronRight, MapPin, Clock, X, ExternalLink } from "lucide-react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useUser } from "../context/UserContext";

// Dummy user position — FH Technikum Wien
const USER_POS: [number, number] = [48.2333, 16.3747];

const userIcon = L.divIcon({
  html: `<div style="
    background-color:#1a73e8;
    width:22px;height:22px;
    border-radius:50%;
    border:3px solid white;
    box-shadow:0 2px 8px rgba(26,115,232,0.5);
  "></div>`,
  className: "",
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

const destIcon = L.divIcon({
  html: `<div style="
    background-color:#3D7A5A;
    width:30px;height:30px;
    border-radius:50%;
    border:3px solid white;
    box-shadow:0 2px 6px rgba(0,0,0,0.35);
    display:flex;align-items:center;justify-content:center;
  "><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'/><circle cx='12' cy='10' r='3'/></svg></div>`,
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

function FitRoute({ start, end }: { start: [number, number]; end: [number, number] }) {
  const map = useMap();
  const fitted = useRef(false);
  useEffect(() => {
    if (fitted.current) return;
    fitted.current = true;
    map.fitBounds([start, end], { padding: [50, 50] });
  }, [map, start, end]);
  return null;
}

// Dummy turn-by-turn steps
function buildSteps(restaurantName: string, address: string) {
  return [
    { icon: "↑", instruction: "Geradeaus auf Stephansplatz", distance: "80 m" },
    { icon: "↰", instruction: "Links in Rotenturmstraße", distance: "150 m" },
    { icon: "↱", instruction: "Rechts in Fleischmarkt", distance: "200 m" },
    { icon: "↰", instruction: "Links in Wollzeile", distance: "120 m" },
    { icon: "↱", instruction: "Rechts in Schubertring", distance: "300 m" },
    { icon: "📍", instruction: `Ziel erreicht: ${restaurantName}`, distance: address },
  ];
}

export function NavigationView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { restaurants } = useUser();
  const restaurant = restaurants.find((r) => r.id === id);

  const [stepIndex, setStepIndex] = useState(0);
  const [arrived, setArrived] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (arrived) return;
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, [arrived]);

  if (!restaurant) {
    return (
      <div className="size-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Restaurant nicht gefunden</p>
          <button onClick={() => navigate("/map")} className="mt-4 text-[#3D7A5A] hover:underline">
            Zurück zur Karte
          </button>
        </div>
      </div>
    );
  }

  const steps = buildSteps(restaurant.name, restaurant.address);
  const currentStep = steps[stepIndex];

  const destPos = useMemo<[number, number]>(
    () => [restaurant.lat, restaurant.lng],
    [restaurant.lat, restaurant.lng]
  );

  const routePoints = useMemo<[number, number][]>(() => {
    const mid1: [number, number] = [
      USER_POS[0] + (destPos[0] - USER_POS[0]) * 0.33,
      USER_POS[1] + (destPos[1] - USER_POS[1]) * 0.15,
    ];
    const mid2: [number, number] = [
      USER_POS[0] + (destPos[0] - USER_POS[0]) * 0.66,
      USER_POS[1] + (destPos[1] - USER_POS[1]) * 0.85,
    ];
    return [USER_POS, mid1, mid2, destPos];
  }, [destPos]);

  const remainingSteps = steps.length - 1 - stepIndex;
  const etaMinutes = Math.max(1, remainingSteps * 2 + Math.round((steps.length - remainingSteps) * 0.5));
  const distanceLeft = ["780 m", "650 m", "480 m", "320 m", "150 m", "Angekommen"][stepIndex] || "0 m";

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setArrived(true);
    }
  };

  const handlePrev = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  if (arrived) {
    return (
      <div className="size-full flex flex-col bg-white">
        <div className="bg-[#3D7A5A] text-white px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate(`/restaurant/${id}`)} className="p-2 hover:bg-[#2f6047] rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Navigation</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-24 h-24 bg-[#d4e8dc] rounded-full flex items-center justify-center mb-6">
            <MapPin className="w-12 h-12 text-[#3D7A5A]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ziel erreicht!</h2>
          <p className="text-gray-600 mb-1 font-medium">{restaurant.name}</p>
          <p className="text-sm text-gray-500 mb-2">{restaurant.address}</p>
          <p className="text-sm text-gray-400 mb-8">Fahrzeit: {formatTime(elapsed)}</p>
          <button
            onClick={() => navigate(`/restaurant/${id}`)}
            className="w-full bg-[#3D7A5A] text-white py-3 px-6 rounded-lg hover:bg-[#2f6047] transition-colors"
          >
            Restaurant-Details ansehen
          </button>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 w-full border border-[#3D7A5A] text-[#3D7A5A] py-3 px-6 rounded-lg hover:bg-[#e9f4ed] transition-colors flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            In Google Maps ansehen
          </a>
          <button
            onClick={() => navigate("/map")}
            className="mt-2 w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Zurück zur Karte
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="size-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-[#3D7A5A] text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/restaurant/${id}`)}
            className="p-1.5 hover:bg-[#2f6047] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <p className="text-xs text-[#a8d4ba]">Navigation zu</p>
            <p className="font-semibold leading-tight">{restaurant.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurant.address)}&travelmode=walking`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs bg-white text-[#3D7A5A] font-semibold px-2.5 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Google Maps
          </a>
          <div className="flex items-center gap-1 text-sm bg-[#2f6047] px-3 py-1.5 rounded-full">
            <Clock className="w-4 h-4" />
            <span>{formatTime(elapsed)}</span>
          </div>
        </div>
      </div>

      {/* Prototype banner */}
      <div className="bg-[#FFF9E6] border-b border-[#F4C430] px-4 py-2 flex items-center gap-2">
        <span className="text-xs text-[#7a5c00]">⚠️ Demo-Ansicht — für echte Navigation "Google Maps" verwenden</span>
      </div>

      {/* Map */}
      <div className="relative flex-1 min-h-0">
        <MapContainer
          center={USER_POS}
          zoom={14}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitRoute start={USER_POS} end={destPos} />
          <Polyline positions={routePoints} color="#1a73e8" weight={5} opacity={0.85} dashArray="0" />
          <Marker position={USER_POS} icon={userIcon} />
          <Marker position={destPos} icon={destIcon} />
        </MapContainer>

        {/* Distance + ETA overlay */}
        <div className="absolute top-3 right-3 z-[1000] bg-white rounded-xl shadow-lg px-3 py-2 text-center">
          <p className="text-lg font-bold text-gray-900">{distanceLeft}</p>
          <p className="text-xs text-gray-500">ca. {etaMinutes} Min.</p>
        </div>
      </div>

      {/* Step card */}
      <div className="bg-white border-t border-gray-200 shadow-lg">
        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-1 bg-[#3D7A5A] transition-all duration-500"
            style={{ width: `${((stepIndex) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        <div className="px-4 py-4">
          {/* Current instruction */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0 w-14 h-14 bg-[#1a73e8] rounded-2xl flex items-center justify-center shadow">
              <span className="text-white text-2xl font-bold">{currentStep.icon}</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 leading-snug">{currentStep.instruction}</p>
              <p className="text-sm text-gray-500 mt-0.5">in {currentStep.distance}</p>
            </div>
          </div>

          {/* Next step preview */}
          {stepIndex < steps.length - 1 && (
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg mb-4">
              <span className="text-gray-400 text-sm font-medium">Dann:</span>
              <span className="text-gray-500 text-sm">{steps[stepIndex + 1].instruction}</span>
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              disabled={stepIndex === 0}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Zurück</span>
            </button>
            <button
              onClick={handleNext}
              className="flex-2 flex-[2] flex items-center justify-center gap-2 py-2.5 bg-[#3D7A5A] text-white rounded-lg hover:bg-[#2f6047] transition-colors"
            >
              <span className="text-sm font-medium">
                {stepIndex === steps.length - 1 ? "Angekommen!" : "Nächster Schritt"}
              </span>
              {stepIndex < steps.length - 1 && <ChevronRight className="w-5 h-5" />}
              {stepIndex === steps.length - 1 && <Navigation className="w-4 h-4" />}
            </button>
          </div>

          {/* Step counter */}
          <div className="flex justify-center gap-1.5 mt-3">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === stepIndex ? "w-6 bg-[#3D7A5A]" : i < stepIndex ? "w-3 bg-[#a8d4ba]" : "w-3 bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
