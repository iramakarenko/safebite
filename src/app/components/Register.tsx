import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Mail, Lock, User } from "lucide-react";
import { useUser } from "../context/UserContext";

export function Register() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwörter stimmen nicht überein!");
      return;
    }

    // Set user data (in real app, this would be an API call)
    setUser({
      name: formData.name,
      email: formData.email,
      allergies: []
    });

    // Navigate to allergy profile setup
    navigate("/allergy-profile");
  };

  return (
    <div className="size-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-[#3D7A5A] text-white px-6 py-4">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-[#2f6047] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Konto erstellen</h1>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-8 overflow-auto">
        <div className="max-w-md mx-auto">
          <p className="text-gray-600 mb-8">
            Erstelle dein Safebite-Konto und finde sichere Restaurants für deine Allergien
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Dein Name"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D7A5A] focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-Mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="deine@email.com"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D7A5A] focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passwort
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D7A5A] focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passwort bestätigen
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D7A5A] focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#3D7A5A] text-white py-3 px-6 rounded-lg hover:bg-[#2f6047] transition-colors"
            >
              Weiter zum Allergie-Profil
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Mit der Registrierung akzeptierst du unsere{" "}
            <a href="#" className="text-[#3D7A5A] hover:underline font-medium">
              Nutzungsbedingungen
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
