import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Star } from "lucide-react";
import { mockRestaurants } from "../data/restaurants";

export function WriteReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [allergenInfo, setAllergenInfo] = useState("");

  const restaurant = mockRestaurants.find((r) => r.id === id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Bitte gib eine Bewertung ab!");
      return;
    }

    if (comment.trim() === "") {
      alert("Bitte schreibe einen Kommentar!");
      return;
    }

    // In a real app, this would send data to an API
    alert(
      `Bewertung erfolgreich gespeichert!\n\nBewertung: ${rating} Sterne\nDanke für deinen Beitrag!`
    );

    // Navigate back to restaurant details
    navigate(`/restaurant/${id}`);
  };

  if (!restaurant) {
    return (
      <div className="size-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Restaurant nicht gefunden</p>
          <button
            onClick={() => navigate("/map")}
            className="mt-4 text-[#3D7A5A] hover:underline"
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
      <div className="bg-[#3D7A5A] text-white px-4 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/restaurant/${id}`)}
            className="p-2 hover:bg-[#2f6047] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Bewertung schreiben</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 py-6 overflow-auto">
        <div className="max-w-md mx-auto">
          {/* Restaurant Info */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {restaurant.name}
            </h2>
            <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Star Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Wie war deine Erfahrung? *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= (hoveredRating || rating)
                          ? "fill-[#F4C430] text-[#F4C430]"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  {rating === 1 && "Schlecht"}
                  {rating === 2 && "Geht so"}
                  {rating === 3 && "Okay"}
                  {rating === 4 && "Gut"}
                  {rating === 5 && "Ausgezeichnet"}
                </p>
              )}
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deine Bewertung *
              </label>
              <textarea
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Teile deine Erfahrung mit der Community. Was hat dir besonders gut gefallen?"
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D7A5A] focus:border-transparent outline-none resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {comment.length} / 500 Zeichen
              </p>
            </div>

            {/* Allergen Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allergen-freie Informationen
              </label>
              <textarea
                value={allergenInfo}
                onChange={(e) => setAllergenInfo(e.target.value)}
                placeholder="Optionale Details über allergen-freie Optionen, Zubereitung, Kennzeichnung, etc."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D7A5A] focus:border-transparent outline-none resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Diese Informationen helfen anderen Menschen mit Allergien!
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-[#FFF9E6] border border-[#F4C430] rounded-lg p-4">
              <p className="text-sm text-[#1a1a1a]">
                ⭐ Deine Bewertung hilft der Community, sichere Restaurants zu finden. Danke für deinen Beitrag!
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#3D7A5A] text-white py-3 px-6 rounded-lg hover:bg-[#2f6047] transition-colors"
            >
              Bewertung veröffentlichen
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
