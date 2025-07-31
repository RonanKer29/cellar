// src/pages/AddWine.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wine, ArrowLeft } from "lucide-react";

const defaultForm = {
  name: "",
  year: "",
  color: "Rouge",
  quantity: 1,
  productor: "",
  country: "",
  status: "En cave",
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

const AddWine = () => {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/bottles/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du vin");
      }

      setForm(defaultForm);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

      <div className="max-w-lg mx-auto pt-8 pb-12 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Wine className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Ajouter un vin
            </h1>
            <p className="text-gray-500">
              Mode rapide – informations essentielles
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Nom du vin */}
            <div>
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

            {/* Millésime */}
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
                required
                type="number"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>

            {/* Producteur */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Producteur *
              </label>
              <input
                name="productor"
                value={form.productor}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Ex: Domaine Jean Martin"
                required
              />
            </div>

            {/* Pays */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pays *
              </label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Ex: France"
                required
              />
            </div>

            {/* Grid for Couleur and Quantité */}
            <div className="grid grid-cols-2 gap-4">
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
                  Quantité *
                </label>
                <input
                  name="quantity"
                  type="number"
                  min="1"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Statut */}
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

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium py-3 rounded-xl transition-all"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Ajout...</span>
                  </div>
                ) : (
                  "Ajouter le vin"
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/ajouter-vin/complet")}
                className="flex-1 border-2 border-gray-300 hover:border-purple-500 text-gray-700 hover:text-purple-600 font-medium py-3 rounded-xl transition-all"
              >
                Mode complet
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddWine;
