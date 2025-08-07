import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Wine, Upload, X, Star, Calendar, MapPin, DollarSign, FileText, Camera, Zap, BarChart3 } from "lucide-react";
import ErrorState from "../components/common/ErrorState";
import ColorfulPageHeader from "../components/common/ColorfulPageHeader";
import GrapeVarietyInput from "../components/wine/GrapeVarietyInput";
import { WINE_COLORS, WINE_STATUS } from "../utils/constants";
import { COUNTRIES, getRegionsByCountry, getAllRegions } from "../data/wine-data";
import { apiService } from "../services/api";
import { addHistoryEvent, EVENT_TYPES } from "../services/historyService";

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

const AddWineFull = () => {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [grapeValidation, setGrapeValidation] = useState({ isValid: true });
  const navigate = useNavigate();
  const fileInput = useRef(null);
  
  const availableRegions = form.country ? getRegionsByCountry(form.country) : getAllRegions();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setForm((prev) => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSelectChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleGrapeChange = (grapeString) => {
    setForm((prev) => ({ ...prev, grape: grapeString }));
  };

  const handleGrapeValidationChange = (validation) => {
    setGrapeValidation(validation);
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
    
    // Vérifier la validation des cépages
    if (!grapeValidation.isValid) {
      setError("Veuillez corriger la composition des cépages avant d'enregistrer.");
      return;
    }
    
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

      const createdBottle = await apiService.createBottle(formData);
      
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

  // Actions pour le header
  const headerActions = (
    <Button
      type="button"
      variant="outline"
      onClick={() => navigate("/ajouter-vin")}
      className="flex items-center space-x-2"
    >
      <Zap className="w-4 h-4" />
      <span>Mode rapide</span>
    </Button>
  );

  return (
    <div className="p-4 pb-16 space-y-6">
        <ColorfulPageHeader
          title="Ajouter un vin complet"
          subtitle="Renseignez toutes les informations de votre bouteille"
          icon={Wine}
          theme="green"
          showBackButton={true}
          backTo="/"
          actions={headerActions}
        />

        <div className="flex flex-col xl:flex-row gap-8">
          {/* Formulaire principal - 3/4 de la largeur sur xl */}
          <div className="xl:w-3/4">
            <div className="space-y-8">
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
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Wine className="w-5 h-5 text-blue-600" />
                    Informations de base
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Nom du vin */}
                    <div className="lg:col-span-2 space-y-2">
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

                    {/* Millésime */}
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

                    {/* Couleur */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Couleur *
                      </Label>
                      <Select
                        value={form.color}
                        onValueChange={(value) => handleSelectChange("color", value)}
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

                    {/* Producteur */}
                    <div className="space-y-2">
                      <Label htmlFor="productor" className="text-sm font-medium text-slate-700">
                        Producteur *
                      </Label>
                      <Input
                        id="productor"
                        name="productor"
                        value={form.productor}
                        onChange={handleChange}
                        placeholder="Nom du producteur"
                        required
                        className="h-11"
                      />
                    </div>

                    {/* Pays */}
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

                    {/* Région */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Région/Appellation
                      </Label>
                      <Combobox
                        options={availableRegions}
                        value={form.region}
                        onValueChange={(value) => handleSelectChange("region", value)}
                        placeholder="Sélectionner une région..."
                        searchPlaceholder="Rechercher une région..."
                        allowCustom={true}
                      />
                    </div>

                    {/* Quantité */}
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

                    {/* Statut */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">
                        Statut *
                      </Label>
                      <Select
                        value={form.status}
                        onValueChange={(value) => handleSelectChange("status", value)}
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
                  </div>

                  {/* Cépages avec système avancé */}
                  <div className="lg:col-span-2">
                    <GrapeVarietyInput
                      value={form.grape}
                      onChange={handleGrapeChange}
                      onValidationChange={handleGrapeValidationChange}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Section: Informations d'achat */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    Informations d'achat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Prix d'achat */}
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-sm font-medium text-slate-700">
                        Prix d'achat (€)
                      </Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="h-11"
                      />
                    </div>

                    {/* Valeur estimée */}
                    <div className="space-y-2">
                      <Label htmlFor="estimated_value" className="text-sm font-medium text-slate-700">
                        Valeur estimée (€)
                      </Label>
                      <Input
                        id="estimated_value"
                        name="estimated_value"
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.estimated_value}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="h-11"
                      />
                    </div>

                    {/* Lieu d'achat */}
                    <div className="space-y-2">
                      <Label htmlFor="purchase_place" className="text-sm font-medium text-slate-700">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Lieu d'achat
                      </Label>
                      <Input
                        id="purchase_place"
                        name="purchase_place"
                        value={form.purchase_place}
                        onChange={handleChange}
                        placeholder="Caviste, supermarché..."
                        className="h-11"
                      />
                    </div>

                    {/* Date d'achat */}
                    <div className="space-y-2">
                      <Label htmlFor="purchase_date" className="text-sm font-medium text-slate-700">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Date d'achat
                      </Label>
                      <Input
                        id="purchase_date"
                        name="purchase_date"
                        type="date"
                        value={form.purchase_date}
                        onChange={handleChange}
                        className="h-11"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Section: Dégustation et notes */}
              <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileText className="w-5 h-5 text-amber-600" />
                    Dégustation et notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Note étoiles */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">
                      Note (sur 5)
                    </Label>
                    {renderStarRating()}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium text-slate-700">
                      Description / Notes personnelles
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Notes personnelles, contexte d'achat..."
                      className="resize-none"
                    />
                  </div>

                  {/* Note de dégustation */}
                  <div className="space-y-2">
                    <Label htmlFor="tasting_note" className="text-sm font-medium text-slate-700">
                      Note de dégustation
                    </Label>
                    <Textarea
                      id="tasting_note"
                      name="tasting_note"
                      value={form.tasting_note}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Arômes, saveurs, impressions de dégustation..."
                      className="resize-none"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Section: Photo */}
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-md">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Camera className="w-5 h-5 text-purple-600" />
                    Photo de la bouteille
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-purple-300 border-dashed rounded-xl cursor-pointer bg-purple-50 hover:bg-purple-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-purple-400" />
                          <p className="mb-2 text-sm text-purple-600">
                            <span className="font-semibold">
                              Cliquez pour télécharger
                            </span>
                          </p>
                          <p className="text-xs text-purple-500">
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
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                          title="Supprimer l'image"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Buttons */}
              <Card className="bg-white shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-4">
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
                        "Ajouter le vin complet"
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
                </CardContent>
              </Card>
            </form>
          </div>
        </div>

        {/* Panneau d'aide - 1/4 de la largeur sur xl */}
        <div className="xl:w-1/4">
          <div className="sticky top-6 space-y-4">
            {/* Mode rapide downgrade */}
            <Card className="border-0 bg-gradient-to-br from-gray-600 via-slate-700 to-gray-800 text-white shadow-lg">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-white/20 rounded-lg">
                      <Zap className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold">Mode Simple</span>
                  </div>
                  <div className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                    Rapide
                  </div>
                </div>
                <h3 className="font-bold text-base mb-2">Saisie rapide disponible</h3>
                <p className="text-white/90 text-sm mb-4 leading-relaxed">
                  Ajoutez vos vins plus rapidement avec les champs essentiels uniquement.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate("/ajouter-vin")}
                  className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 font-medium transition-all"
                >
                  Passer au mode rapide
                </Button>
              </CardContent>
            </Card>

            {/* Progression avancée */}
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-blue-100 rounded-lg">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">Progression avancée</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Sections complétées</span>
                    <span className="font-semibold text-gray-900">
                      {[
                        form.name && form.year && form.productor && form.country,
                        form.price || form.shopName || form.purchaseDate,
                        form.description || form.rating,
                        form.image
                      ].filter(Boolean).length}/4
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${([
                          form.name && form.year && form.productor && form.country,
                          form.price || form.shopName || form.purchaseDate,
                          form.description || form.rating,
                          form.image
                        ].filter(Boolean).length / 4) * 100}%`
                      }}
                    ></div>
                  </div>
                  
                  <div className="space-y-3 mt-4">
                    <div className={`flex items-center justify-between p-2 rounded-lg ${
                      form.name && form.year && form.productor && form.country ? 'bg-green-50' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          form.name && form.year && form.productor && form.country ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                        <span className="text-sm font-medium text-gray-900">Informations de base</span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        form.name && form.year && form.productor && form.country
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        Requis
                      </div>
                    </div>
                    
                    <div className={`flex items-center justify-between p-2 rounded-lg ${
                      form.price || form.shopName || form.purchaseDate ? 'bg-blue-50' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          form.price || form.shopName || form.purchaseDate ? 'bg-blue-500' : 'bg-gray-300'
                        }`}></div>
                        <span className="text-sm font-medium text-gray-900">Informations d'achat</span>
                      </div>
                      <div className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        Optionnel
                      </div>
                    </div>
                    
                    <div className={`flex items-center justify-between p-2 rounded-lg ${
                      form.description || form.rating ? 'bg-purple-50' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          form.description || form.rating ? 'bg-purple-500' : 'bg-gray-300'
                        }`}></div>
                        <span className="text-sm font-medium text-gray-900">Notes de dégustation</span>
                      </div>
                      <div className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        Optionnel
                      </div>
                    </div>
                    
                    <div className={`flex items-center justify-between p-2 rounded-lg ${
                      form.image ? 'bg-orange-50' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          form.image ? 'bg-orange-500' : 'bg-gray-300'
                        }`}></div>
                        <span className="text-sm font-medium text-gray-900">Photo</span>
                      </div>
                      <div className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        Recommandé
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guide expert */}
            <Card className="border-0 shadow-sm bg-white">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-indigo-100 rounded-lg">
                    <Wine className="w-4 h-4 text-indigo-600" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">Guide expert</span>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-indigo-600">💰</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">Valeur financière</p>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        Renseignez le prix d'achat pour suivre l'évolution de votre investissement.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-indigo-600">📝</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">Notes personnelles</p>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        Vos impressions et évaluations vous aideront lors de futures dégustations.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-indigo-600">📸</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">Photo de qualité</p>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        Une photo claire facilite l'identification et valorise votre collection.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistiques de collection */}
            <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-green-100">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-emerald-200 rounded-lg">
                    <BarChart3 className="w-4 h-4 text-emerald-700" />
                  </div>
                  <span className="text-sm font-semibold text-emerald-900">Votre collection</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-center p-2 bg-white/60 rounded-lg">
                    <div className="font-bold text-lg text-emerald-800">-</div>
                    <div className="text-emerald-600 text-xs">Bouteilles</div>
                  </div>
                  <div className="text-center p-2 bg-white/60 rounded-lg">
                    <div className="font-bold text-lg text-emerald-800">-</div>
                    <div className="text-emerald-600 text-xs">Valeur €</div>
                  </div>
                  <div className="text-center p-2 bg-white/60 rounded-lg">
                    <div className="font-bold text-lg text-emerald-800">-</div>
                    <div className="text-emerald-600 text-xs">Régions</div>
                  </div>
                  <div className="text-center p-2 bg-white/60 rounded-lg">
                    <div className="font-bold text-lg text-emerald-800">-</div>
                    <div className="text-emerald-600 text-xs">Millésimes</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
    </div>
  );
};

export default AddWineFull;
