/**
 * @fileoverview Carte d'affichage individuelle d'une bouteille de vin
 * Présente les informations essentielles avec design interactif et actions rapides
 */

import { Wine, MapPin, Calendar, Euro, Edit, Trash2, Star, Package } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";
import { apiService } from "../../services/api";
import { getWineColorClass } from "../../utils/wineColors";
import { getBottleDisplayStatus } from "../../utils/bottleFilters";
import { addHistoryEvent, EVENT_TYPES } from "../../services/historyService";

/**
 * Carte interactive d'affichage d'une bouteille de vin
 * Affiche les informations clés avec animations et actions (voir, modifier, supprimer)
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.bottle - Données de la bouteille à afficher
 * @param {number} props.bottle.id - Identifiant unique de la bouteille
 * @param {string} props.bottle.name - Nom du vin
 * @param {string} props.bottle.color - Type de vin (Rouge, Blanc, Rosé, Pétillant)
 * @param {number} props.bottle.year - Millésime
 * @param {string} props.bottle.productor - Nom du producteur
 * @param {string} props.bottle.region - Région viticole
 * @param {string} props.bottle.country - Pays d'origine
 * @param {number} props.bottle.price - Prix unitaire
 * @param {number} props.bottle.quantity - Quantité en stock
 * @param {string} props.bottle.status - Statut (En cave, Bue, etc.)
 * @param {number} props.bottle.rating - Note sur 5 étoiles
 * @param {string} props.bottle.description - Description du vin
 * @param {string} props.bottle.tasting_note - Notes de dégustation
 * @param {Function} [props.onClick] - Fonction callback lors du clic sur la carte
 * 
 * @example
 * <WineCard 
 *   bottle={{
 *     id: 1,
 *     name: "Château Margaux",
 *     color: "Rouge",
 *     year: 2015,
 *     productor: "Château Margaux",
 *     region: "Margaux",
 *     price: 500,
 *     quantity: 1,
 *     status: "En cave",
 *     rating: 5
 *   }}
 *   onClick={() => console.log('Carte cliquée')}
 * />
 * 
 * @returns {JSX.Element} Carte interactive avec informations du vin et boutons d'action
 */
const WineCard = ({ bottle, onClick }) => {
  const navigate = useNavigate();
  const displayStatus = getBottleDisplayStatus(bottle);

  /**
   * Gère la suppression d'une bouteille avec confirmation utilisateur
   * @param {Event} e - Événement de clic pour éviter la propagation
   */
  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm(`Supprimer "${bottle.name}" de votre cave ?`)) {
      try {
        // Enregistrer l'événement de suppression AVANT la suppression
        addHistoryEvent({
          type: EVENT_TYPES.DELETED,
          bottleId: bottle.id,
          bottleName: bottle.name,
          bottleProductor: bottle.productor,
          bottleYear: bottle.year,
          bottleColor: bottle.color,
          quantity: bottle.quantity // Suppression complète
        });

        await apiService.deleteBottle(bottle.id);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting bottle:", error);
        alert("Erreur lors de la suppression");
      }
    }
  };

  /**
   * Navigue vers la page de détail de la bouteille
   */
  const handleCardClick = () => {
    navigate(`/bouteille/${bottle.id}`);
  };

  // Les fonctions de couleur sont maintenant gérées par le système unifié

  /**
   * Affiche la notation en étoiles d'un vin
   * @param {number} rating - Note sur 5 étoiles
   * @returns {JSX.Element|null} Composant d'étoiles ou null si pas de note
   */
  const renderStarRating = (rating) => {
    if (!rating) return null;
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">{rating}/5</span>
      </div>
    );
  };

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] bg-white/95 backdrop-blur-sm border-0 shadow-lg overflow-hidden transform-gpu will-change-transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${displayStatus.opacity}`}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Voir les détails de ${bottle.name}, ${bottle.color} ${bottle.year || ''} de ${bottle.productor || 'producteur inconnu'}`}
    >
      {/* Header avec gradient coloré */}
      <CardHeader className={`relative p-0 h-32 ${getWineColorClass(bottle.color, 'cardHeader')} border-b-2 overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent group-hover:from-white/30 transition-all duration-300"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
        <div className="relative p-4 h-full flex items-center justify-between">
          {/* Icône du vin */}
          <div className={`p-3 rounded-2xl ${getWineColorClass(bottle.color, 'gradientFull')} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
            <Wine className="w-8 h-8 text-white drop-shadow-sm group-hover:rotate-12 transition-transform duration-300" />
          </div>
          
          {/* Badges status et quantité */}
          <div className="flex flex-col items-end space-y-2">
            <Badge 
              variant={displayStatus.status === 'consumed' ? "destructive" : "default"}
              className="shadow-sm font-medium group-hover:shadow-md group-hover:scale-105 transition-all duration-200"
            >
              {displayStatus.status === 'consumed' ? 'Consommée' : 'En cave'}
            </Badge>
            {bottle.quantity > 1 && (
              <Badge variant="secondary" className="shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-200">
                <Package className="w-3 h-3 mr-1 group-hover:animate-pulse" />
                {bottle.quantity}x
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {/* Titre et producteur */}
        <div className="space-y-2">
          <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
            {bottle.name}
          </h3>
          {bottle.productor && (
            <p className="text-sm text-gray-600 font-medium truncate">
              {bottle.productor}
            </p>
          )}
        </div>

        {/* Informations principales */}
        <div className="space-y-3 sm:space-y-4">
          {/* Millésime et couleur */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              <span className="font-medium">{bottle.year || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge 
                variant="outline" 
                className={`text-xs border-2 ${getWineColorClass(bottle.color, 'badge')} font-medium`}
                aria-label={`Vin ${bottle.color}`}
              >
                {bottle.color}
              </Badge>
              {/* Badge de statut de stock */}
              <Badge 
                variant={displayStatus.badgeVariant}
                className="text-xs font-medium"
                aria-label={displayStatus.label}
              >
                {displayStatus.status === 'consumed' ? '0 ❌' : `${bottle.quantity || 0} 📦`}
              </Badge>
            </div>
          </div>

          {/* Région */}
          {bottle.region && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <span className="truncate font-medium">{bottle.region}</span>
              {bottle.country && bottle.country !== bottle.region && (
                <span className="text-gray-400 text-xs">• {bottle.country}</span>
              )}
            </div>
          )}

          {/* Prix */}
          {bottle.price && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Euro className="w-4 h-4" aria-hidden="true" />
                <span className="font-semibold text-gray-900">{bottle.price} €</span>
              </div>
              {bottle.quantity > 1 && (
                <span className="text-xs text-gray-500" aria-label={`Prix total pour ${bottle.quantity} bouteilles`}>
                  {(bottle.price * bottle.quantity).toFixed(2)} € total
                </span>
              )}
            </div>
          )}

          {/* Note */}
          {bottle.rating && (
            <div className="flex items-center justify-center py-2" role="img" aria-label={`Note: ${bottle.rating} étoiles sur 5`}>
              {renderStarRating(bottle.rating)}
            </div>
          )}
        </div>

        {/* Description courte */}
        {(bottle.description || bottle.tasting_note) && (
          <div className="text-xs sm:text-sm text-gray-500 line-clamp-2 bg-gray-50 p-3 rounded-lg border group-hover:bg-gray-100 group-hover:border-gray-300 transition-all duration-200">
            {bottle.description || bottle.tasting_note}
          </div>
        )}
      </CardContent>

      {/* Actions footer */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t flex justify-end items-center space-x-2 group-hover:from-gray-100 group-hover:to-gray-200 transition-all duration-300">
        <Link to={`/bouteille/${bottle.id}/edit`} onClick={(e) => e.stopPropagation()}>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:scale-110 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Modifier ${bottle.name}`}
          >
            <Edit className="w-4 h-4 hover:rotate-12 transition-transform duration-200" aria-hidden="true" />
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleDelete}
          className="text-gray-600 hover:text-red-600 hover:bg-red-50 hover:scale-110 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label={`Supprimer ${bottle.name}`}
        >
          <Trash2 className="w-4 h-4 hover:animate-pulse transition-all duration-200" aria-hidden="true" />
        </Button>
      </div>
    </Card>
  );
};

// La fonction getColorClass a été remplacée par le système unifié wineColors

export default WineCard;