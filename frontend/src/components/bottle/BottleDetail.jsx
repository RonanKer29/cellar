/**
 * @fileoverview Page de détail d'une bouteille de vin
 * Affichage complet des informations d'une bouteille avec actions de gestion
 */

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Wine,
  Edit,
  Trash2,
  ArrowLeft,
  MapPin,
  Star,
  ShoppingCart,
  Grape,
  FileText,
  Calendar,
  Minus,
  Eye,
  Clock,
  Award,
  Camera,
  DollarSign,
  Package,
  TrendingUp,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiService } from "../../services/api";

const getColorClass = (color) => {
  switch (color) {
    case "Rouge":
      return "bg-gradient-to-br from-red-100 to-red-200 border-red-300";
    case "Blanc":
      return "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300";
    case "Rosé":
      return "bg-gradient-to-br from-pink-100 to-pink-200 border-pink-300";
    case "Pétillant":
      return "bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300";
    default:
      return "bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300";
  }
};

const getGrapeColor = (index) => {
  const colors = [
    "bg-purple-500",
    "bg-red-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-blue-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-emerald-500",
  ];
  return colors[index % colors.length];
};

const BottleDetail = () => {
  const { id } = useParams();
  const [bottle, setBottle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quantityToRemove, setQuantityToRemove] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBottle = async () => {
      try {
        const data = await apiService.getBottle(id);
        setBottle(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bottle:', error);
        setLoading(false);
      }
    };
    
    fetchBottle();
  }, [id]);

  const handleDelete = () => {
    setQuantityToRemove(1);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (quantityToRemove <= 0 || quantityToRemove > bottle.quantity) {
      return;
    }

    setIsDeleting(true);

    try {
      const newQuantity = bottle.quantity - quantityToRemove;

      if (newQuantity === 0) {
        await apiService.deleteBottle(id);
        navigate("/");
      } else {
        await apiService.patchBottle(id, { quantity: newQuantity });
        setBottle({ ...bottle, quantity: newQuantity });
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const handleMarkAsDrunk = async () => {
    try {
      await apiService.patchBottle(id, { status: "Bue" });
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors du marquage comme bu:", error);
    }
  };

  const renderStarRating = (rating) => {
    if (!rating) return null;

    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-700">
          {rating}/5
        </span>
      </div>
    );
  };

  const parseGrapeComposition = (grapeString) => {
    if (!grapeString) return [];

    const grapes = grapeString
      .split(",")
      .map((grape) => {
        const trimmed = grape.trim();
        const percentageMatch = trimmed.match(/^(.+?)\s*\((\d+(?:\.\d+)?)%\)$/);

        if (percentageMatch) {
          return {
            name: percentageMatch[1].trim(),
            percentage: parseFloat(percentageMatch[2]),
          };
        } else {
          return {
            name: trimmed,
            percentage: null,
          };
        }
      })
      .filter((grape) => grape.name);

    // Si aucun pourcentage n'est spécifié, on répartit équitablement
    const hasPercentages = grapes.some((grape) => grape.percentage !== null);
    if (!hasPercentages && grapes.length > 0) {
      const equalPercentage = Math.round(100 / grapes.length);
      grapes.forEach((grape) => {
        grape.percentage = equalPercentage;
      });
    }

    return grapes;
  };

  const renderGrapeComposition = (grapeString) => {
    const grapes = parseGrapeComposition(grapeString);
    if (grapes.length === 0) return null;

    const totalPercentage = grapes.reduce(
      (sum, grape) => sum + (grape.percentage || 0),
      0
    );

    return (
      <div className="space-y-4">
        {grapes.map((grape, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-800">
                {grape.name}
              </span>
              <Badge variant="secondary" className="text-xs">
                {grape.percentage ? `${grape.percentage}%` : "N/A"}
              </Badge>
            </div>
            {grape.percentage && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${getGrapeColor(
                    index
                  )} h-2 rounded-full transition-all duration-700 ease-out`}
                  style={{
                    width: `${
                      (grape.percentage / Math.max(totalPercentage, 100)) * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
        ))}
        {totalPercentage > 0 && totalPercentage !== 100 && (
          <div className="text-xs text-gray-500 mt-2">
            Total: {totalPercentage}%
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Wine className="w-8 h-8 text-white animate-pulse" />
          </div>
          <p className="text-gray-600 text-lg font-medium">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!bottle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-12">
            <Wine className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <CardTitle className="text-2xl mb-4">Vin non trouvé</CardTitle>
            <CardDescription className="mb-8">
              Cette bouteille n'existe pas ou a été supprimée.
            </CardDescription>
            <Button onClick={() => navigate("/")} className="w-full">
              Retour à la collection
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Navigation */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center space-x-3 text-slate-600 hover:text-slate-800 transition-colors group"
          >
            <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-slate-200 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-medium">Retour à la collection</span>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Image Section - Plus petite */}
          <div className="lg:col-span-4">
            <Card
              className={`${getColorClass(
                bottle.color
              )} border-2 overflow-hidden`}
            >
              <CardContent className="p-6">
                <div className="relative h-64 sm:h-80 flex items-center justify-center">
                  {bottle.image ? (
                    <div className="relative group">
                      <img
                        src={bottle.image}
                        alt={`Bouteille de ${bottle.name}`}
                        className="max-h-full w-auto object-contain rounded-lg shadow-lg transition-all duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextElementSibling.style.display = "block";
                        }}
                      />
                      <div className="hidden text-center">
                        <Wine className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 text-sm">
                          Image non disponible
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Camera className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-sm">Aucune image</p>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant={
                        bottle.status === "Bue" ? "destructive" : "default"
                      }
                      className="shadow-lg"
                    >
                      {bottle.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Section - Plus d'espace */}
          <div className="lg:col-span-8 space-y-6">
            {/* Title Section */}
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                      {bottle.name}
                    </CardTitle>
                    <CardDescription className="text-lg font-medium mb-2">
                      {bottle.productor}
                    </CardDescription>
                    <div className="flex items-center text-gray-500 space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">
                        {bottle.region && `${bottle.region}, `}
                        {bottle.country}
                      </span>
                    </div>
                  </div>
                  {bottle.rating && (
                    <div className="text-right">
                      <div className="flex items-center justify-end mb-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                        <span className="text-2xl font-bold text-gray-900">
                          {bottle.rating}
                        </span>
                        <span className="text-gray-500 ml-1">/5</span>
                      </div>
                      <p className="text-sm text-gray-500">Note</p>
                    </div>
                  )}
                </div>
              </CardHeader>
            </Card>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4 text-center">
                  <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {bottle.year}
                  </p>
                  <p className="text-xs text-gray-600 font-medium">Millésime</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-4 text-center">
                  <Wine className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {bottle.color}
                  </p>
                  <p className="text-xs text-gray-600 font-medium">Type</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4 text-center">
                  <Package className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {bottle.quantity}
                  </p>
                  <p className="text-xs text-gray-600 font-medium">Quantité</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                <CardContent className="p-4 text-center">
                  <Award className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">750ml</p>
                  <p className="text-xs text-gray-600 font-medium">Volume</p>
                </CardContent>
              </Card>
            </div>

            {/* Prix et valeurs */}
            {(bottle.price || bottle.estimated_value) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bottle.price && (
                  <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 font-medium mb-1">
                            Prix d'achat
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            €{bottle.price}
                          </p>
                        </div>
                        <DollarSign className="w-8 h-8 text-emerald-600" />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {bottle.estimated_value && (
                  <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 font-medium mb-1">
                            Valeur estimée
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            €{bottle.estimated_value}
                          </p>
                          {bottle.price && (
                            <div className="flex items-center mt-1">
                              <TrendingUp className="w-4 h-4 mr-1 text-teal-600" />
                              <span
                                className={`text-sm font-medium ${
                                  bottle.estimated_value > bottle.price
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {bottle.estimated_value > bottle.price
                                  ? "+"
                                  : ""}
                                €
                                {(
                                  bottle.estimated_value - bottle.price
                                ).toFixed(2)}
                              </span>
                            </div>
                          )}
                        </div>
                        <TrendingUp className="w-8 h-8 text-teal-600" />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Grape Composition */}
            {bottle.grape && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Grape className="w-5 h-5 text-purple-600" />
                    Composition des cépages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderGrapeComposition(bottle.grape)}
                </CardContent>
              </Card>
            )}

            {/* Purchase Information */}
            {(bottle.purchase_date || bottle.purchase_place) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                    Informations d'achat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bottle.purchase_place && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 font-medium">
                          Lieu d'achat
                        </span>
                        <span className="text-gray-900 font-semibold">
                          {bottle.purchase_place}
                        </span>
                      </div>
                    )}
                    {bottle.purchase_date && (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 font-medium">
                          Date d'achat
                        </span>
                        <span className="text-gray-900 font-semibold">
                          {new Date(bottle.purchase_date).toLocaleDateString(
                            "fr-FR"
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Description */}
            {bottle.description && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-600" />
                    Description / Notes personnelles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <p className="text-gray-700 leading-relaxed">
                      {bottle.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tasting Notes */}
            {bottle.tasting_note && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-pink-600" />
                    Notes de dégustation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <p className="text-gray-700 leading-relaxed">
                      {bottle.tasting_note}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Technical Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  Informations techniques
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium">
                      Date d'ajout
                    </span>
                    <span className="text-gray-900 font-semibold">
                      {new Date(bottle.date_added).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  {bottle.region && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600 font-medium">
                        Appellation
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {bottle.region}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => navigate(`/bouteille/${id}/edit`)}
                    className="flex-1 h-12"
                    variant="default"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>

                  <Button
                    onClick={handleMarkAsDrunk}
                    disabled={bottle.status === "Bue"}
                    variant={bottle.status === "Bue" ? "secondary" : "default"}
                    className="flex-1 h-12"
                  >
                    <Wine className="w-4 h-4 mr-2" />
                    {bottle.status === "Bue"
                      ? "Déjà dégusté"
                      : "Marquer comme bu"}
                  </Button>

                  <Button
                    onClick={handleDelete}
                    variant="destructive"
                    className="flex-1 h-12"
                  >
                    <Minus className="w-4 h-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal de suppression */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Minus className="w-5 h-5 text-red-500" />
              <span>Supprimer des bouteilles</span>
            </DialogTitle>
            <DialogDescription>
              Vous avez{" "}
              <span className="font-semibold">
                {bottle?.quantity} bouteille(s)
              </span>{" "}
              de {bottle?.name}. Combien souhaitez-vous en supprimer ?
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantité à supprimer</Label>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setQuantityToRemove(Math.max(1, quantityToRemove - 1))
                  }
                  disabled={quantityToRemove <= 1}
                >
                  -
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max={bottle?.quantity || 1}
                  value={quantityToRemove}
                  onChange={(e) =>
                    setQuantityToRemove(
                      Math.min(
                        bottle?.quantity || 1,
                        Math.max(1, parseInt(e.target.value) || 1)
                      )
                    )
                  }
                  className="text-center w-20"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setQuantityToRemove(
                      Math.min(bottle?.quantity || 1, quantityToRemove + 1)
                    )
                  }
                  disabled={quantityToRemove >= (bottle?.quantity || 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              {quantityToRemove === bottle?.quantity ? (
                <p className="text-red-600 font-medium">
                  ⚠️ Toute la bouteille sera supprimée définitivement de votre
                  collection.
                </p>
              ) : (
                <p>
                  Il restera{" "}
                  <span className="font-semibold">
                    {(bottle?.quantity || 1) - quantityToRemove} bouteille(s)
                  </span>{" "}
                  dans votre collection.
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              disabled={isDeleting}
            >
              Annuler
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={confirmDelete}
              disabled={isDeleting}
              className="flex items-center space-x-2"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Suppression...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  <span>
                    {quantityToRemove === bottle?.quantity
                      ? "Supprimer tout"
                      : `Supprimer ${quantityToRemove}`}
                  </span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BottleDetail;
