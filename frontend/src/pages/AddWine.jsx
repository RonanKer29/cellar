/**
 * @fileoverview Page d'ajout d'un nouveau vin à la collection
 * Formulaire complet avec validation et intégration API pour enrichir la cave
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Wine, Plus, CheckCircle } from "lucide-react";
import ErrorState from "../components/common/ErrorState";
import ColorfulPageHeader from "../components/common/ColorfulPageHeader";
import GrapeVarietyInput from "../components/wine/GrapeVarietyInput";
import { WINE_COLORS, WINE_STATUS } from "../utils/constants";
import {
  COUNTRIES,
  getRegionsByCountry,
  getAllRegions,
} from "../data/wine-data";
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
  const [grapeValidation, setGrapeValidation] = useState({ isValid: true });
  const navigate = useNavigate();

  const availableRegions = form.country
    ? getRegionsByCountry(form.country)
    : getAllRegions();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGrapeChange = (grapeString) => {
    setForm((prev) => ({ ...prev, grape: grapeString }));
  };

  const handleGrapeValidationChange = (validation) => {
    setGrapeValidation(validation);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier la validation des cépages
    if (!grapeValidation.isValid) {
      setError(
        "Veuillez corriger la composition des cépages avant d'enregistrer."
      );
      return;
    }

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
        quantity: form.quantity,
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
      <div className="max-w-7xl mx-auto pt-6 pb-28 px-4 sm:px-6 lg:px-8">
        <ColorfulPageHeader
          title="Ajouter un vin"
          subtitle="Mode rapide – informations essentielles"
          icon={Wine}
          theme="green"
          showBackButton={true}
          backTo="/"
          actions={headerActions}
        />

        <div className="flex flex-col xl:flex-row gap-8">
          {/* Formulaire principal - 3/4 de la largeur sur xl */}
          <div className="xl:w-3/4">
            <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-bold text-slate-900">
                  Informations du vin
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Remplissez les champs essentiels pour ajouter rapidement une
                  bouteille
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
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-slate-700"
                    >
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
                      <Label
                        htmlFor="year"
                        className="text-sm font-medium text-slate-700"
                      >
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
                      <Label
                        htmlFor="productor"
                        className="text-sm font-medium text-slate-700"
                      >
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
                          setForm((prev) => ({
                            ...prev,
                            country: value,
                            region: "",
                          }));
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
                          setForm((prev) => ({ ...prev, region: value }));
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
                          setForm((prev) => ({ ...prev, color: value }));
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
                      <Label
                        htmlFor="quantity"
                        className="text-sm font-medium text-slate-700"
                      >
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
                      onValidationChange={handleGrapeValidationChange}
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
                        setForm((prev) => ({ ...prev, status: value }));
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
                      disabled={loading || !grapeValidation.isValid}
                      className="flex-1 h-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
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

          {/* Panneau d'aide et conseils - 1/4 de la largeur sur xl */}
          <div className="xl:w-1/4">
            <div className="sticky top-6 space-y-4">
              {/* Mode complet upgrade */}
              <Card className="border-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 text-white shadow-lg">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-white/20 rounded-lg">
                        <Plus className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold">Mode Pro</span>
                    </div>
                    <div className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                      Upgrade
                    </div>
                  </div>
                  <h3 className="font-bold text-base mb-2">
                    Mode complet disponible
                  </h3>
                  <p className="text-white/90 text-sm mb-4 leading-relaxed">
                    Accédez au formulaire avancé avec photos, notes de
                    dégustation, prix et bien plus encore.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate("/ajouter-vin/complet")}
                    className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 font-medium transition-all"
                  >
                    Passer au mode complet
                  </Button>
                </CardContent>
              </Card>

              {/* Progression du formulaire */}
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-green-100 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      Progression
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Champs complétés</span>
                      <span className="font-semibold text-gray-900">
                        {
                          Object.values(form).filter(
                            (value) => value && value.toString().trim()
                          ).length
                        }
                        /7
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            (Object.values(form).filter(
                              (value) => value && value.toString().trim()
                            ).length /
                              7) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div
                        className={`flex items-center gap-2 text-xs ${
                          form.name ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            form.name ? "bg-green-500" : "bg-gray-300"
                          }`}
                        ></div>
                        Nom
                      </div>
                      <div
                        className={`flex items-center gap-2 text-xs ${
                          form.year ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            form.year ? "bg-green-500" : "bg-gray-300"
                          }`}
                        ></div>
                        Millésime
                      </div>
                      <div
                        className={`flex items-center gap-2 text-xs ${
                          form.productor ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            form.productor ? "bg-green-500" : "bg-gray-300"
                          }`}
                        ></div>
                        Producteur
                      </div>
                      <div
                        className={`flex items-center gap-2 text-xs ${
                          form.country ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            form.country ? "bg-green-500" : "bg-gray-300"
                          }`}
                        ></div>
                        Pays
                      </div>
                      <div
                        className={`flex items-center gap-2 text-xs ${
                          form.region ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            form.region ? "bg-green-500" : "bg-gray-300"
                          }`}
                        ></div>
                        Région
                      </div>
                      <div
                        className={`flex items-center gap-2 text-xs ${
                          form.color ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            form.color ? "bg-green-500" : "bg-gray-300"
                          }`}
                        ></div>
                        Couleur
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guide et conseils */}
              <Card className="border-0 shadow-sm bg-white">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 bg-blue-100 rounded-lg">
                      <Wine className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      Guide rapide
                    </span>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-indigo-600">
                          1
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 mb-1">
                          Informations essentielles
                        </p>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          Nom, millésime et producteur sont les champs
                          obligatoires pour identifier votre vin.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-indigo-600">
                          2
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 mb-1">
                          Localisation
                        </p>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          Sélectionnez d'abord le pays pour filtrer
                          automatiquement les régions disponibles.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold text-indigo-600">
                          3
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 mb-1">
                          Cépages
                        </p>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          Si vous renseignez des pourcentages, le total doit
                          égaler 100%.
                        </p>
                      </div>
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
