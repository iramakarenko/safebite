import { useNavigate } from "react-router";
import { Utensils, ShieldCheck, MapPin, Wheat } from "lucide-react";

export function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="size-full flex flex-col">
      {/* Header */}
      <div className="bg-[#3D7A5A] text-white px-6 py-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Wheat className="w-10 h-10" />
            <h1 className="text-3xl font-bold">Safebite</h1>
          </div>
          <p className="text-[#d4e8dc]">
            Finde sichere Restaurants für deine Allergien
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 overflow-auto">
        <div className="max-w-md mx-auto">
          {/* Features */}
          <div className="space-y-6 mb-12">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#F4C430] rounded-full flex items-center justify-center shadow-md">
                <MapPin className="w-6 h-6 text-[#1a1a1a]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Restaurants in deiner Nähe
                </h3>
                <p className="text-sm text-gray-600">
                  Finde allergen-freie Restaurants auf der Karte
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#d4e8dc] rounded-full flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#3D7A5A]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Sicher essen gehen
                </h3>
                <p className="text-sm text-gray-600">
                  Detaillierte Allergen-Informationen für jedes Restaurant
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#F4C430] rounded-full flex items-center justify-center shadow-md">
                <Utensils className="w-6 h-6 text-[#1a1a1a]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Community-Bewertungen
                </h3>
                <p className="text-sm text-gray-600">
                  Erfahrungen von anderen Menschen mit Allergien
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/register")}
              className="w-full bg-[#3D7A5A] text-white py-3 px-6 rounded-lg hover:bg-[#2f6047] transition-colors shadow-md"
            >
              Neues Konto erstellen
            </button>
            <button
              onClick={() => navigate("/map")}
              className="w-full bg-[#F4C430] text-[#1a1a1a] py-3 px-6 rounded-lg hover:bg-[#E0B020] transition-colors shadow-md font-medium"
            >
              Als Gast fortfahren
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Bereits registriert?{" "}
            <button
              onClick={() => navigate("/map")}
              className="text-[#3D7A5A] hover:underline font-medium"
            >
              Anmelden
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
