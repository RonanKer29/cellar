/**
 * @fileoverview Page d'ajout d'un nouveau vin à la collection
 * Formulaire complet avec validation et intégration API pour enrichir la cave
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Wine, Plus } from "lucide-react";
import ErrorState from "../components/common/ErrorState";
import ColorfulPageHeader from "../components/common/ColorfulPageHeader";
import GrapeVarietyInput from "../components/wine/GrapeVarietyInput";
import { WINE_COLORS, WINE_STATUS } from "../utils/constants";
import { COUNTRIES, getRegionsByCountry, getAllRegions } from "../data/wine-data";
import { apiService } from "../services/api";
import { addHistoryEvent, EVENT_TYPES } from "../services/historyService";

/**
 * Structure par défaut du formulaire d'ajout de vin
 * Définit les valeurs initiales pour tous les champs obligatoires
 */
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

/**
 * Page d'ajout d'un nouveau vin à la collection personnelle
 * Fournit un formulaire complet avec sélection de pays/régions et gestion des cépages
 * 
 * @example
 * // Navigation vers la page d'ajout
 * <Link to="/ajouter-vin">Ajouter un vin</Link>
 * 
 * @returns {JSX.Element} Formulaire d'ajout de vin avec validation et soumission
 */
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
      const createdBottle = await apiService.createBottle(form);
      
      // Enregistrer l'événement d'ajout dans l'historique
      addHistoryEvent({
        type: EVENT_TYPES.ADDED,
        bottleId: createdBottle.id,
        bottleName: form.name,
        bottleProductor: form.productor,
        bottleYear: form.year,
        bottleColor: form.color,
        quantity: form.quantity
      });
      
      setForm(defaultForm);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Actions pour le header
  const headerActions = (
    <Button
      type="button"
      variant="outline"
      onClick={() => navigate("/ajouter-vin/complet")}
      className="flex items-center space-x-2"
    >
      <Plus className="w-4 h-4" />
      <span>Mode complet</span>
    </Button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto pt-6 pb-28 px-4 sm:px-6 lg:px-8">
        <ColorfulPageHeader
          title="Ajouter un vin"
          subtitle="Mode rapide – informations essentielles"
          icon={Wine}
          theme="green"
          showBackButton={true}
          backTo="/"
          actions={headerActions}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire principal - 2/3 de la largeur sur desktop */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-bold text-slate-900">
                  Informations du vin
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Remplissez les champs essentiels pour ajouter rapidement une bouteille
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-100">
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
                  onClick={() => navigate("/")}
                  className="flex-1 h-12 border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-800 font-medium rounded-xl transition-all"
                >
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Panneau d'aide et conseils - 1/3 de la largeur sur desktop */}
      <div className="lg:col-span-1">
        <div className="sticky top-6 space-y-6">
          {/* Conseils */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-purple-800 flex items-center gap-2">
                <Wine className="w-5 h-5" />
                Conseils d'ajout
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-purple-700">
              <div className="space-y-2">
                <p className="font-medium">✨ Mode rapide</p>
                <p className="text-purple-600">Parfait pour ajouter rapidement vos bouteilles avec les informations essentielles.</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium">🏷️ Informations importantes</p>
                <p className="text-purple-600">Le nom, millésime et producteur sont requis. Le reste peut être ajouté plus tard.</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium">🌍 Pays et régions</p>
                <p className="text-purple-600">Commencez par sélectionner le pays pour filtrer les régions disponibles.</p>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-blue-800">
                Votre collection
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-blue-700">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Bouteilles totales</span>
                  <span className="font-semibold">-</span>
                </div>
                <div className="flex justify-between">
                  <span>Dernière ajoutée</span>
                  <span className="font-semibold">-</span>
                </div>
                <div className="flex justify-between">
                  <span>Région favorite</span>
                  <span className="font-semibold">-</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default AddWine;
