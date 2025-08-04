/**
 * @fileoverview En-tête de page réutilisable avec navigation et icône
 * Composant standardisé pour les en-têtes de toutes les pages de l'application
 */

import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * En-tête de page standardisé avec titre, sous-titre, icône et navigation
 * Fournit une interface cohérente pour tous les en-têtes de pages
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.title - Titre principal de la page
 * @param {string} [props.subtitle] - Sous-titre ou description de la page (optionnel)
 * @param {React.Component} [props.icon] - Composant d'icône Lucide React à afficher (optionnel)
 * @param {boolean} [props.showBackButton=false] - Afficher le bouton de retour
 * @param {string} [props.backTo="/"] - URL de destination du bouton de retour
 * @param {string} [props.className=""] - Classes CSS supplémentaires
 * 
 * @example
 * // En-tête simple avec titre
 * <PageHeader title="Ma Cave à Vin" />
 * 
 * @example
 * // En-tête complet avec icône, sous-titre et bouton retour
 * <PageHeader 
 *   title="Ajouter un vin"
 *   subtitle="Enrichissez votre collection"
 *   icon={Wine}
 *   showBackButton={true}
 *   backTo="/ma-cave"
 * />
 * 
 * @returns {JSX.Element} En-tête de page avec titre, icône optionnelle et navigation
 */
const PageHeader = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  showBackButton = false, 
  backTo = "/",
  className = "" 
}) => {
  const navigate = useNavigate();

  return (
    <div className={`bg-white shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {showBackButton && (
          <button
            onClick={() => navigate(backTo)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour</span>
          </button>
        )}
        
        <div className="text-center">
          {Icon && (
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon className="w-8 h-8 text-white" />
            </div>
          )}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          {subtitle && <p className="text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;