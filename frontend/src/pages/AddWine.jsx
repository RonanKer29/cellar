// src/pages/AddWine.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Wine, ArrowLeft } from "lucide-react";
import ErrorState from "../components/common/ErrorState";
import GrapeVarietyInput from "../components/wine/GrapeVarietyInput";
import { WINE_COLORS, WINE_STATUS } from "../utils/constants";
import { COUNTRIES, getRegionsByCountry, getAllRegions } from "../data/wine-data";
import { apiService } from "../services/api";

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
};

const AddWine = () => {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const availableRegions = form.country ? getRegionsByCountry(form.country) : getAllRegions();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  const handleGrapeChange = (grapeString) => {
    setForm((prev) => ({ ...prev, grape: grapeString }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiService.createBottle(form);
      setForm(defaultForm);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-3 text-slate-600 hover:text-slate-800 transition-colors group"
          >
            <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-slate-200 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-medium">Retour à la collection</span>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto pt-8 pb-12 px-4">
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Wine className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">
              Ajouter un vin
            </CardTitle>
            <CardDescription className="text-slate-600">
              Mode rapide – informations essentielles
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <ErrorState 
                message="Une erreur est survenue" 
                error={error} 
                className="mb-6" 
              />
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Nom du vin */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                  Nom du vin *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ex: Château Margaux"
                  required
                  className="h-11"
                />
              </div>

              {/* Millésime et Producteur */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year" className="text-sm font-medium text-slate-700">
                    Millésime *
                  </Label>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={form.year}
                    onChange={handleChange}
                    placeholder="2020"
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productor" className="text-sm font-medium text-slate-700">
                    Producteur *
                  </Label>
                  <Input
                    id="productor"
                    name="productor"
                    value={form.productor}
                    onChange={handleChange}
                    placeholder="Domaine Jean Martin"
                    required
                    className="h-11"
                  />
                </div>
              </div>

              {/* Pays et Région */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Pays *
                  </Label>
                  <Combobox
                    options={COUNTRIES}
                    value={form.country}
                    onValueChange={(value) => {
                      setForm(prev => ({ ...prev, country: value, region: "" }));
                    }}
                    placeholder="Sélectionner un pays..."
                    searchPlaceholder="Rechercher un pays..."
                    allowCustom={true}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Région/Appellation
                  </Label>
                  <Combobox
                    options={availableRegions}
                    value={form.region}
                    onValueChange={(value) => {
                      setForm(prev => ({ ...prev, region: value }));
                    }}
                    placeholder="Sélectionner une région..."
                    searchPlaceholder="Rechercher une région..."
                    allowCustom={true}
                  />
                </div>
              </div>

              {/* Couleur et Quantité */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Couleur *
                  </Label>
                  <Select
                    value={form.color}
                    onValueChange={(value) => {
                      setForm(prev => ({ ...prev, color: value }));
                    }}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Sélectionner une couleur" />
                    </SelectTrigger>
                    <SelectContent>
                      {WINE_COLORS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-sm font-medium text-slate-700">
                    Quantité *
                  </Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    value={form.quantity}
                    onChange={handleChange}
                    required
                    className="h-11"
                  />
                </div>
              </div>

              {/* Cépages */}
              <div className="space-y-2">
                <GrapeVarietyInput
                  value={form.grape}
                  onChange={handleGrapeChange}
                />
              </div>

              {/* Statut */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Statut *
                </Label>
                <Select
                  value={form.status}
                  onValueChange={(value) => {
                    setForm(prev => ({ ...prev, status: value }));
                  }}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    {WINE_STATUS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 h-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-xl"
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
                  onClick={() => navigate("/ajouter-vin/complet")}
                  className="flex-1 h-12 border-2 border-slate-300 hover:border-purple-500 text-slate-700 hover:text-purple-600 font-medium rounded-xl transition-all hover:bg-purple-50"
                >
                  Mode complet
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddWine;
