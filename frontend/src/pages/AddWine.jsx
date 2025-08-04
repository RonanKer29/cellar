// src/pages/AddWine.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wine } from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import FormField from "../components/forms/FormField";
import SelectField from "../components/forms/SelectField";
import ErrorState from "../components/common/ErrorState";
import { DEFAULT_WINE_FORM, WINE_COLORS, WINE_STATUS } from "../utils/constants";
import { apiService } from "../services/api";

const AddWine = () => {
  const [form, setForm] = useState(DEFAULT_WINE_FORM);
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
      await apiService.createBottle(form);
      setForm(DEFAULT_WINE_FORM);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Ajouter un vin"
        subtitle="Mode rapide – informations essentielles"
        icon={Wine}
        showBackButton={true}
        backTo="/"
      />

      <div className="max-w-lg mx-auto pt-8 pb-12 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          {error && (
            <ErrorState 
              message="Une erreur est survenue" 
              error={error} 
              className="mb-6" 
            />
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <FormField
              label="Nom du vin"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ex: Château Margaux"
              required
            />

            <FormField
              label="Millésime"
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="Ex: 2015"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              required
            />

            <FormField
              label="Producteur"
              name="productor"
              value={form.productor}
              onChange={handleChange}
              placeholder="Ex: Domaine Jean Martin"
              required
            />

            <FormField
              label="Pays"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Ex: France"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <SelectField
                label="Couleur"
                name="color"
                value={form.color}
                onChange={handleChange}
                options={WINE_COLORS}
                required
              />

              <FormField
                label="Quantité"
                name="quantity"
                type="number"
                min="1"
                value={form.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <SelectField
              label="Statut"
              name="status"
              value={form.status}
              onChange={handleChange}
              options={WINE_STATUS}
              required
            />

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
