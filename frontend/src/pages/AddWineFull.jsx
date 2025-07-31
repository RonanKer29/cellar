// src/pages/AddWineFull.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wine, ArrowLeft, Upload, X, Star } from "lucide-react";

const defaultForm = {
  name: "",
  year: "",
  color: "Rouge",
  quantity: 1,
  productor: "",
  country: "",
  region: "",
  grape: "",
  status: "En cave",
  price: "",
  estimated_value: "",
  purchase_place: "",
  purchase_date: "",
  description: "",
  tasting_note: "",
  rating: "",
  image: null,
};

const colorOptions = [
  { value: "Rouge", label: "Rouge" },
  { value: "Blanc", label: "Blanc" },
  { value: "Rosé", label: "Rosé" },
  { value: "Pétillant", label: "Pétillant" },
  { value: "Autre", label: "Autre" },
];

const statusOptions = [
  { value: "En cave", label: "En cave" },
  { value: "Bue", label: "Bue" },
];

const AddWineFull = () => {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const fileInput = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setForm((prev) => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const removeImage = () => {
    setPreview(null);
    setForm((prev) => ({ ...prev, image: null }));
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Utilise FormData pour l'image
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== "" && value !== null) {
          formData.append(key, value);
        }
      });

      const response = await fetch("http://127.0.0.1:8000/api/bottles/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du vin");
      }

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStarRating = () => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                rating: prev.rating === star.toString() ? "" : star.toString(),
              }))
            }
            className={`p-1 rounded transition-colors ${
              parseInt(form.rating) >= star
                ? "text-yellow-400"
                : "text-gray-300 hover:text-yellow-200"
            }`}
          >
            <Star
              className={`w-6 h-6 ${
                parseInt(form.rating) >= star ? "fill-current" : ""
              }`}
            />
          </button>
        ))}
        {form.rating && (
          <span className="ml-2 text-sm text-gray-600">{form.rating}/5</span>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour à la collection</span>
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto pt-8 pb-12 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Wine className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Ajouter un vin complet
            </h1>
            <p className="text-gray-500">
              Renseignez toutes les informations de votre bouteille
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form
            className="space-y-8"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            {/* Section: Informations de base */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Informations de base
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du vin *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Ex: Château Margaux"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Millésime *
                  </label>
                  <input
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Ex: 2015"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Couleur *
                  </label>
                  <select
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    {colorOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Producteur *
                  </label>
                  <input
                    name="productor"
                    value={form.productor}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Nom du producteur"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pays *
                  </label>
                  <input
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="France, Italie..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Région/Appellation
                  </label>
                  <input
                    name="region"
                    value={form.region}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Bordeaux, Bourgogne..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cépage(s)
                  </label>
                  <input
                    name="grape"
                    value={form.grape}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Cabernet Sauvignon, Merlot..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantité *
                  </label>
                  <input
                    name="quantity"
                    type="number"
                    min="1"
                    value={form.quantity}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Statut *
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section: Informations d'achat */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Informations d'achat
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix d'achat (€)
                  </label>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Prix d'achat"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valeur estimée (€)
                  </label>
                  <input
                    name="estimated_value"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.estimated_value}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Valeur estimée"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lieu d'achat
                  </label>
                  <input
                    name="purchase_place"
                    value={form.purchase_place}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Caviste, supermarché..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date d'achat
                  </label>
                  <input
                    name="purchase_date"
                    type="date"
                    value={form.purchase_date}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Section: Dégustation et notes */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Dégustation et notes
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note (sur 5)
                  </label>
                  {renderStarRating()}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description / Notes personnelles
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    placeholder="Notes personnelles, contexte d'achat..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note de dégustation
                  </label>
                  <textarea
                    name="tasting_note"
                    value={form.tasting_note}
                    onChange={handleChange}
                    rows={4}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    placeholder="Arômes, saveurs, impressions de dégustation..."
                  />
                </div>
              </div>
            </div>

            {/* Section: Photo */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Photo de la bouteille
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image
                </label>
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">
                            Cliquez pour télécharger
                          </span>
                        </p>
                        <p className="text-xs text-gray-500">
                          JPG, PNG ou WEBP
                        </p>
                      </div>
                      <input
                        ref={fileInput}
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {preview && (
                    <div className="relative inline-block">
                      <img
                        src={preview}
                        alt="Aperçu"
                        className="h-32 w-auto object-cover rounded-xl border shadow-md"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        title="Supprimer l'image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium py-3 rounded-xl transition-all"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Ajout en cours...</span>
                  </div>
                ) : (
                  "Ajouter le vin"
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
                className="flex-1 border-2 border-gray-300 hover:border-purple-500 text-gray-700 hover:text-purple-600 font-medium py-3 rounded-xl transition-all"
              >
                Annuler
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddWineFull;
