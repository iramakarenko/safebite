import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useUser } from "../context/UserContext";

interface FormErrors {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function Register() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<FormErrors>({ name: "", email: "", password: "", confirmPassword: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = (data: typeof formData): FormErrors => {
    const e: FormErrors = { name: "", email: "", password: "", confirmPassword: "" };
    if (!data.name.trim()) e.name = "Name darf nicht leer sein.";
    if (!data.email.trim()) e.email = "E-Mail darf nicht leer sein.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Bitte eine gültige E-Mail eingeben.";
    if (!data.password) e.password = "Passwort darf nicht leer sein.";
    else if (data.password.length < 6) e.password = "Passwort muss mindestens 6 Zeichen lang sein.";
    if (!data.confirmPassword) e.confirmPassword = "Bitte Passwort bestätigen.";
    else if (data.password !== data.confirmPassword) e.confirmPassword = "Passwörter stimmen nicht überein.";
    return e;
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (touched[field]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, password: true, confirmPassword: true };
    setTouched(allTouched);
    const errs = validate(formData);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;

    setUser({ name: formData.name, email: formData.email, allergies: [] });
    navigate("/allergy-profile");
  };

  const fieldClass = (field: keyof FormErrors) =>
    `w-full pl-11 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-[#3D7A5A] focus:border-transparent outline-none transition-colors ${
      touched[field] && errors[field] ? "border-red-400 bg-red-50" : "border-gray-300"
    }`;

  return (
    <div className="size-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-[#3D7A5A] text-white px-6 py-4">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <button onClick={() => navigate("/")} className="p-2 hover:bg-[#2f6047] rounded-lg transition-colors">
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

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                  placeholder="Dein Name"
                  className={fieldClass("name")}
                />
              </div>
              {touched.name && errors.name && (
                <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            {/* E-Mail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-Mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                  placeholder="deine@email.com"
                  className={fieldClass("email")}
                />
              </div>
              {touched.email && errors.email && (
                <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Passwort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Passwort</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onBlur={() => handleBlur("password")}
                  placeholder="Mindestens 6 Zeichen"
                  className={fieldClass("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Passwort bestätigen */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Passwort bestätigen</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  onBlur={() => handleBlur("confirmPassword")}
                  placeholder="••••••••"
                  className={fieldClass("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#3D7A5A] text-white py-3 px-6 rounded-lg hover:bg-[#2f6047] transition-colors mt-2"
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
