import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import { Search, Filter, Plus, MapPin, Star, User, Wheat, LocateFixed, Loader2 } from "lucide-react";
import { mockRestaurants, Restaurant, cuisineEmoji } from "../data/restaurants";
import { useUser } from "../context/UserContext";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const VIENNA_CENTER: [number, number] = [48.2160, 16.3738];

const markerIcon = L.divIcon({
  html: `<div style="
    background-color:#3D7A5A;
    width:30px;height:30px;
    border-radius:50%;
    border:3px solid white;
    box-shadow:0 2px 6px rgba(0,0,0,0.35);
    display:flex;align-items:center;justify-content:center;
  "><svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'/></svg></div>`,
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -34],
});

const userIcon = L.divIcon({
  html: `<div class="sb-user-dot"></div>`,
  className: "",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

function MapController({ restaurants }: { restaurants: Restaurant[] }) {
  const map = useMap();
  useEffect(() => {
    if (restaurants.length === 0) return;
    if (restaurants.length === 1) { map.setView([restaurants[0].lat, restaurants[0].lng], 14); return; }
    const bounds = L.latLngBounds(restaurants.map((r) => [r.lat, r.lng] as [number, number]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
  }, [restaurants, map]);
  return null;
}

function FocusUser({ pos, active }: { pos: [number, number] | null; active: boolean }) {
  const map = useMap();
  useEffect(() => {
    if (active && pos) map.flyTo(pos, 15, { duration: 1.2 });
  }, [active, pos, map]);
  return null;
}

export function MapView() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>(user?.allergies || ["gluten"]);
  const [showMenu, setShowMenu] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locationFound, setLocationFound] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [locationAddress, setLocationAddress] = useState("");
  const [focusUser, setFocusUser] = useState(false);

  const handleLocate = () => {
    if (locationFound && userPos) { setFocusUser(f => !f); return; }
    if (!navigator.geolocation) {
      setLocationError("Geolocation wird von diesem Browser nicht unterstützt.");
      return;
    }
    setLocating(true);
    setLocationError("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserPos(coords);
        // Reverse geocode via Nominatim
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords[0]}&lon=${coords[1]}&format=json`,
            { headers: { "Accept-Language": "de" } }
          );
          const data = await res.json();
          const { road, house_number, postcode, city, town, village } = data.address || {};
          const street = [road, house_number].filter(Boolean).join(" ");
          const place = city || town || village || "";
          setLocationAddress([street, postcode, place].filter(Boolean).join(", ") || data.display_name);
        } catch {
          setLocationAddress(`${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}`);
        }
        setLocating(false);
        setLocationFound(true);
        setFocusUser(true);
      },
      (err) => {
        setLocating(false);
        if (err.code === 1) setLocationError("Standort-Zugriff verweigert. Bitte Berechtigung erteilen.");
        else if (err.code === 2) setLocationError("Standort konnte nicht ermittelt werden.");
        else setLocationError("Zeitüberschreitung bei der Standortermittlung.");
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  };

  const filteredRestaurants = useMemo(() => {
    return mockRestaurants.filter((restaurant) => {
      const matchesSearch =
        searchQuery === "" ||
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesAllergens =
        selectedAllergens.length === 0 ||
        selectedAllergens.every((allergen) => restaurant.allergenFree.includes(allergen));
      return matchesSearch && matchesAllergens;
    });
  }, [searchQuery, selectedAllergens]);

  const toggleAllergenFilter = (allergen: string) => {
    setSelectedAllergens(prev =>
      prev.includes(allergen) ? prev.filter((a) => a !== allergen) : [...prev, allergen]
    );
  };

  return (
    <div className="size-full flex flex-col bg-white">
      {/* Pulse CSS for user dot */}
      <style>{`
        @keyframes sb-pulse { 0% { transform: scale(1); opacity: 0.8; } 70% { transform: scale(2.5); opacity: 0; } 100% { transform: scale(2.5); opacity: 0; } }
        .sb-user-dot { position: relative; width: 20px; height: 20px; }
        .sb-user-dot::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(26, 115, 232, 0.35);
          animation: sb-pulse 2s ease-out infinite;
        }
        .sb-user-dot::after {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 13px; height: 13px;
          background: #1a73e8;
          border-radius: 50%;
          border: 2.5px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        }
      `}</style>

      {/* Header */}
      <div className="bg-[#3D7A5A] text-white px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Wheat className="w-6 h-6" />
            <h1 className="text-xl font-bold">Safebite</h1>
          </div>
          <button onClick={() => setShowMenu(!showMenu)} className="p-2 hover:bg-[#2f6047] rounded-lg transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Restaurant suchen..."
            className="w-full pl-11 pr-4 py-2 rounded-lg text-gray-900 outline-none"
          />
        </div>
      </div>

      {/* User Menu Dropdown */}
      {showMenu && (
        <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 min-w-48">
          <button onClick={() => { setShowMenu(false); navigate("/allergy-profile"); }} className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700">Allergie-Profil bearbeiten</button>
          <button onClick={() => { setShowMenu(false); navigate("/"); }} className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700">Abmelden</button>
        </div>
      )}

      {/* Filter + Location bar */}
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 text-[#3D7A5A] hover:text-[#2f6047]">
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filter {selectedAllergens.length > 0 && `(${selectedAllergens.length})`}</span>
        </button>

        {/* Location button */}
        <button
          onClick={handleLocate}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            locationFound
              ? "bg-[#d4e8dc] text-[#2f6047]"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {locating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <LocateFixed className="w-4 h-4" />
          )}
          <span>
            {locating ? "Wird ermittelt…" : locationFound ? "Mein Standort" : "Standort"}
          </span>
        </button>
      </div>

      {/* Location found info strip */}
      {locationFound && locationAddress && (
        <div className="px-4 py-2 bg-[#e9f4ed] border-b border-[#a8d4ba] flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#2f6047] flex-shrink-0" />
          <p className="text-xs text-[#1f4a37] truncate">
            <span className="font-semibold">Dein Standort: </span>{locationAddress}
          </p>
        </div>
      )}
      {/* Location error strip */}
      {locationError && (
        <div className="px-4 py-2 bg-red-50 border-b border-red-200 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-400 flex-shrink-0" />
          <p className="text-xs text-red-600">{locationError}</p>
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <div className="px-4 py-4 bg-gray-50 border-b border-gray-200">
          <p className="text-sm font-medium text-gray-700 mb-3">Nach Allergenen filtern:</p>
          <div className="flex flex-wrap gap-2">
            {["gluten", "lactose", "nuts", "eggs", "fish", "shellfish", "soy", "sesame"].map((allergen) => (
              <button
                key={allergen}
                onClick={() => toggleAllergenFilter(allergen)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedAllergens.includes(allergen)
                    ? "bg-[#3D7A5A] text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:border-[#3D7A5A]"
                }`}
              >
                {allergen === "gluten" && "Glutenfrei"}
                {allergen === "lactose" && "Laktosefrei"}
                {allergen === "nuts" && "Nussfrei"}
                {allergen === "eggs" && "Eifrei"}
                {allergen === "fish" && "Fischfrei"}
                {allergen === "shellfish" && "Schalentierfrei"}
                {allergen === "soy" && "Sojafrei"}
                {allergen === "sesame" && "Sesamfrei"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Map */}
      <div className="relative h-64 border-b border-gray-200 z-0">
        <MapContainer
          center={VIENNA_CENTER}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapController restaurants={filteredRestaurants} />
          <FocusUser pos={userPos} active={focusUser} />

          {/* User location marker */}
          {locationFound && userPos && (
            <>
              <Circle
                center={userPos}
                radius={80}
                pathOptions={{ color: "#1a73e8", fillColor: "#1a73e8", fillOpacity: 0.08, weight: 1.5, opacity: 0.4 }}
              />
              <Marker position={userPos} icon={userIcon}>
                <Popup>
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900 mb-0.5">📍 Dein Standort</p>
                    {locationAddress && <p className="text-xs text-gray-500">{locationAddress}</p>}
                  </div>
                </Popup>
              </Marker>
            </>
          )}

          {/* Restaurant markers */}
          {filteredRestaurants.map((restaurant) => (
            <Marker key={restaurant.id} position={[restaurant.lat, restaurant.lng]} icon={markerIcon}>
              <Popup>
                <div className="min-w-[150px]">
                  <p className="font-semibold text-gray-900 text-sm mb-1">{restaurant.name}</p>
                  <p className="text-xs text-gray-500 mb-2">{restaurant.cuisine}</p>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-[#F4C430] text-[#F4C430]" />
                    <span className="text-xs font-medium">{restaurant.rating}</span>
                    {restaurant.distance && <span className="text-xs text-gray-400 ml-1">· {restaurant.distance}</span>}
                  </div>
                  <button
                    onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                    className="w-full text-xs bg-[#3D7A5A] text-white py-1.5 px-3 rounded-md hover:bg-[#2f6047] transition-colors"
                  >
                    Details anzeigen
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Locating overlay */}
        {locating && (
          <div className="absolute inset-0 bg-white/60 z-[1000] flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg px-6 py-4 flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-[#3D7A5A] animate-spin" />
              <p className="text-sm font-medium text-gray-700">Standort wird ermittelt…</p>
            </div>
          </div>
        )}
      </div>

      {/* Restaurant List */}
      <div className="flex-1 overflow-auto">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700">
            {filteredRestaurants.length} Restaurants gefunden
          </p>
          <button
            onClick={() => navigate("/add-restaurant")}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#F4C430] text-[#1a1a1a] rounded-full hover:bg-[#E0B020] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Hinzufügen</span>
          </button>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
            />
          ))}
          {filteredRestaurants.length === 0 && (
            <div className="px-4 py-12 text-center">
              <p className="text-gray-500 mb-2">Keine Restaurants gefunden</p>
              <p className="text-sm text-gray-400">Versuche andere Filter oder füge ein neues Restaurant hinzu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function RestaurantCard({ restaurant, onClick }: { restaurant: Restaurant; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full px-4 py-4 hover:bg-gray-50 transition-colors text-left">
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-16 h-16 bg-[#e9f4ed] rounded-lg flex items-center justify-center text-3xl">
          {cuisineEmoji[restaurant.cuisine] ?? "🍽️"}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 mb-1">{restaurant.name}</h3>
          <p className="text-sm text-gray-600 mb-1">{restaurant.cuisine}</p>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#F4C430] text-[#F4C430]" />
              <span>{restaurant.rating}</span>
            </div>
            {restaurant.distance && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{restaurant.distance}</span>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {restaurant.allergenFree.map((allergen) => (
              <span key={allergen} className="inline-block px-2 py-0.5 bg-[#d4e8dc] text-[#2f6047] text-xs rounded-full">
                {allergen}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
