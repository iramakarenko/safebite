import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, MapPin, Utensils, Check } from "lucide-react";

const allergenOptions = [
  { id: "gluten", label: "Glutenfrei" },
  { id: "lactose", label: "Laktosefrei" },
  { id: "nuts", label: "Nussfrei" },
  { id: "eggs", label: "Eifrei" },
  { id: "fish", label: "Fischfrei" },
  { id: "soy", label: "Sojafrei" }
];

export function AddRestaurant() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    cuisine: "",
    allergenFree: [] as string[]
  });

  const toggleAllergen = (allergenId: string) => {
    if (formData.allergenFree.includes(allergenId)) {
      setFormData({
        ...formData,
        allergenFree: formData.allergenFree.filter((id) => id !== allergenId)
      });
    } else {
      setFormData({
        ...formData,
        allergenFree: [...formData.allergenFree, allergenId]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.allergenFree.length === 0) {
      alert("Bitte wähle mindestens eine allergen-freie Option aus!");
      return;
    }

    // In a real app, this would send data to an API
    alert(
      `Restaurant "${formData.name}" erfolgreich hinzugefügt!\n\nDanke für deinen Beitrag zur Community.`
    );

    // Navigate to map view
    navigate("/map");
  };

  return (
    <div className="size-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-[#3D7A5A] text-white px-4 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/map")}
            className="p-2 hover:bg-[#2f6047] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Restaurant hinzufügen</h1>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-4 py-6 overflow-auto">
        <div className="max-w-md mx-auto">
          <p className="text-gray-600 mb-6">
            Hilf der Community, indem du ein neues allergen-freundliches Restaurant hinzufügst.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Restaurant Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Restaurant Name *
              </label>
              <div className="relative">
                <Utensils className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="z.B. Cafe Sonnenschein"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D7A5A] focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adresse *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Straße und Hausnummer, PLZ Ort"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D7A5A] focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Cuisine Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Küchenstil *
              </label>
              <select
                required
                value={formData.cuisine}
                onChange={(e) =>
                  setFormData({ ...formData, cuisine: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D7A5A] focus:border-transparent outline-none"
              >
                <option value="">Bitte wählen...</option>
                <option value="Italienisch">Italienisch</option>
                <option value="Asiatisch">Asiatisch</option>
                <option value="Vegetarisch / Vegan">Vegetarisch / Vegan</option>
                <option value="Burger & Fast Food">Burger & Fast Food</option>
                <option value="Café & Bakery">Café & Bakery</option>
                <option value="Österreichisch">Österreichisch</option>
                <option value="International">International</option>
              </select>
            </div>

            {/* Allergen-Free Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Allergen-freie Optionen * (mind. 1)
              </label>
              <div className="space-y-2">
                {allergenOptions.map((allergen) => {
                  const isSelected = formData.allergenFree.includes(allergen.id);
                  return (
                    <button
                      key={allergen.id}
                      type="button"
                      onClick={() => toggleAllergen(allergen.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                        isSelected
                          ? "border-[#3D7A5A] bg-[#e9f4ed]"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <span className="font-medium text-gray-900">
                        {allergen.label}
                      </span>
                      {isSelected && (
                        <div className="w-6 h-6 bg-[#3D7A5A] rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-[#FFF9E6] border border-[#F4C430] rounded-lg p-4">
              <p className="text-sm text-[#1a1a1a]">
                💡 Nach dem Hinzufügen kannst du eine detaillierte Bewertung mit deinen Erfahrungen schreiben.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#3D7A5A] text-white py-3 px-6 rounded-lg hover:bg-[#2f6047] transition-colors"
            >
              Restaurant hinzufügen
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
