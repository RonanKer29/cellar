import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Wine, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password_confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
    }
    
    if (formData.password !== formData.password_confirm) {
      newErrors.password_confirm = "Les mots de passe ne correspondent pas";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await register(formData);
      
      if (result.success) {
        setSuccessMessage("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors({ general: result.error || "Une erreur s'est produite" });
        }
      }
    } catch (err) {
      setErrors({ general: "Une erreur inattendue s'est produite" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex bg-gradient-to-br from-pink-600 to-purple-600 p-4 rounded-2xl shadow-lg mb-4">
            <Wine className="text-white w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ma Cave à vin</h1>
          <p className="text-gray-600">Créez votre compte</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl font-bold text-center">Inscription</CardTitle>
            <CardDescription className="text-center">
              Remplissez le formulaire pour créer votre compte
            </CardDescription>
          </CardHeader>
          <CardContent>
            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm mb-4 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {errors.general}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="first_name" className="text-sm font-medium text-gray-700">
                    Prénom
                  </label>
                  <Input
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="Prénom"
                    value={formData.first_name}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="h-11"
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-xs">{errors.first_name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="last_name" className="text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <Input
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="Nom"
                    value={formData.last_name}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="h-11"
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-xs">{errors.last_name}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-gray-700">
                  Nom d'utilisateur *
                </label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Nom d'utilisateur"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="h-11"
                />
                {errors.username && (
                  <p className="text-red-500 text-xs">{errors.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="h-11"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Mot de passe *
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimum 8 caractères"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password_confirm" className="text-sm font-medium text-gray-700">
                  Confirmer le mot de passe *
                </label>
                <div className="relative">
                  <Input
                    id="password_confirm"
                    name="password_confirm"
                    type={showPasswordConfirm ? "text" : "password"}
                    placeholder="Confirmez votre mot de passe"
                    value={formData.password_confirm}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showPasswordConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password_confirm && (
                  <p className="text-red-500 text-xs">{errors.password_confirm}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold h-11 shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? "Création du compte..." : "Créer mon compte"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Déjà un compte ?{" "}
                <Link
                  to="/login"
                  className="font-medium text-pink-600 hover:text-pink-500 transition-colors"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            Version 1.0 • Made with ❤️
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;