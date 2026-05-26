import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Check } from "lucide-react";
import { useUser } from "../context/UserContext";

const allergenOptions = [
  { id: "gluten", label: "Gluten", icon: "🌾" },
  { id: "lactose", label: "Laktose", icon: "🥛" },
  { id: "nuts", label: "Nüsse", icon: "🥜" },
  { id: "eggs", label: "Eier", icon: "🥚" },
  { id: "fish", label: "Fisch", icon: "🐟" },
  { id: "shellfish", label: "Schalentiere", icon: "🦐" },
  { id: "soy", label: "Soja", icon: "🫘" },
  { id: "sesame", label: "Sesam", icon: "🌻" }
];

export function AllergyProfile() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  const toggleAllergy = (allergyId: string) => {
    if (selectedAllergies.includes(allergyId)) {
      setSelectedAllergies(selectedAllergies.filter(id => id !== allergyId));
    } else {
      setSelectedAllergies([...selectedAllergies, allergyId]);
    }
  };

  const handleSubmit = () => {
    if (selectedAllergies.length === 0) {
      alert("Bitte wähle mindestens eine Allergie aus!");
      return;
    }

    if (user) {
      setUser({
        ...user,
        allergies: selectedAllergies
      });
    }

    navigate("/map");
  };

  return (
    <div className="size-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-[#3D7A5A] text-white px-6 py-4">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className="p-2 hover:bg-[#2f6047] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Allergie-Profil</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 overflow-auto">
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welche Allergien hast du?
            </h2>
            <p className="text-gray-600">
              Wähle alle Allergien aus, die auf dich zutreffen. Wir zeigen dir nur Restaurants, die sichere Optionen für dich haben.
            </p>
          </div>

          {/* Allergy Grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {allergenOptions.map((allergen) => {
              const isSelected = selectedAllergies.includes(allergen.id);
              return (
                <button
                  key={allergen.id}
                  onClick={() => toggleAllergy(allergen.id)}
                  className={`relative p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? "border-[#3D7A5A] bg-[#e9f4ed]"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-[#3D7A5A] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="text-3xl mb-2">{allergen.icon}</div>
                  <div className="text-sm font-medium text-gray-900">
                    {allergen.label}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Count */}
          {selectedAllergies.length > 0 && (
            <div className="bg-[#F4C430] border border-[#E0B020] rounded-lg p-4 mb-6 shadow-sm">
              <p className="text-sm text-[#1a1a1a] font-medium">
                <span className="font-bold">{selectedAllergies.length}</span>{" "}
                {selectedAllergies.length === 1 ? "Allergie" : "Allergien"} ausgewählt
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={selectedAllergies.length === 0}
            className={`w-full py-3 px-6 rounded-lg transition-colors ${
              selectedAllergies.length > 0
                ? "bg-[#3D7A5A] text-white hover:bg-[#2f6047]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Profil erstellen
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Du kannst dein Profil jederzeit in den Einstellungen ändern
          </p>
        </div>
      </div>
    </div>
  );
}
