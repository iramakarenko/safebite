import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  Navigation,
  Star,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  MessageSquare
} from "lucide-react";
import { mockRestaurants, cuisineEmoji } from "../data/restaurants";

export function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = mockRestaurants.find((r) => r.id === id);

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
            onClick={() => navigate("/map")}
            className="p-2 hover:bg-[#2f6047] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Restaurant Details</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Restaurant Image Placeholder */}
        <div className="h-48 bg-gradient-to-br from-[#d4e8dc] to-[#a8d4ba] flex items-center justify-center">
          <span className="text-8xl">{cuisineEmoji[restaurant.cuisine] ?? "🍽️"}</span>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Restaurant Header */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {restaurant.name}
            </h2>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1 bg-[#F4C430] px-2 py-1 rounded-full">
                <Star className="w-4 h-4 fill-[#1a1a1a] text-[#1a1a1a]" />
                <span className="font-semibold text-[#1a1a1a] text-sm">
                  {restaurant.rating}
                </span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">{restaurant.cuisine}</span>
              {restaurant.distance && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{restaurant.distance}</span>
                </>
              )}
            </div>

            {/* Allergen-Free Tags */}
            <div className="flex flex-wrap gap-2">
              {restaurant.allergenFree.map((allergen) => (
                <span
                  key={allergen}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-[#d4e8dc] text-[#2f6047] rounded-full"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span className="capitalize">{allergen}-frei</span>
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Über das Restaurant</h3>
            <p className="text-gray-600">{restaurant.description}</p>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Adresse</p>
                <p className="text-sm text-gray-600">{restaurant.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Telefon</p>
                <p className="text-sm text-gray-600">+43 1 234 5678</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Öffnungszeiten</p>
                <p className="text-sm text-gray-600">Mo-Fr: 11:00 - 22:00</p>
                <p className="text-sm text-gray-600">Sa-So: 12:00 - 23:00</p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">
                Bewertungen ({restaurant.reviews.length})
              </h3>
              <button
                onClick={() => navigate(`/write-review/${restaurant.id}`)}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#F4C430] text-[#1a1a1a] rounded-full hover:bg-[#E0B020] transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm font-medium">Bewerten</span>
              </button>
            </div>

            {restaurant.reviews.length > 0 ? (
              <div className="space-y-4">
                {restaurant.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900">{review.author}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#F4C430] text-[#F4C430]" />
                        <span className="text-sm font-medium">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
                    {review.allergenInfo && (
                      <div className="mt-2 p-2 bg-[#e9f4ed] rounded border border-[#a8d4ba]">
                        <p className="text-xs text-[#1f4a37]">
                          <ShieldCheck className="w-3 h-3 inline mr-1" />
                          {review.allergenInfo}
                        </p>
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-2">{review.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">Noch keine Bewertungen</p>
                <p className="text-xs">Sei der Erste, der eine Bewertung schreibt!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Navigation Button */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <button
          onClick={() => navigate(`/navigation/${restaurant.id}`)}
          className="w-full bg-[#3D7A5A] text-white py-3 px-6 rounded-lg hover:bg-[#2f6047] transition-colors flex items-center justify-center gap-2"
        >
          <Navigation className="w-5 h-5" />
          Navigation starten
        </button>
      </div>
    </div>
  );
}
