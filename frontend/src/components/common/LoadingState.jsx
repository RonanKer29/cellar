/**
 * @fileoverview Composant d'affichage des états de chargement
 * Fournit une animation de chargement cohérente avec message personnalisable
 */

/**
 * Composant d'état de chargement avec spinner animé
 * Affiche une animation de chargement avec message personnalisable
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} [props.message="Chargement..."] - Message à afficher pendant le chargement
 * @param {string} [props.className=""] - Classes CSS supplémentaires pour personnaliser l'apparence
 * 
 * @example
 * // Chargement simple avec message par défaut
 * <LoadingState />
 * 
 * @example
 * // Chargement avec message personnalisé
 * <LoadingState 
 *   message="Chargement de votre cave à vin..." 
 *   className="min-h-64"
 * />
 * 
 * @returns {JSX.Element} Interface de chargement avec spinner animé et message
 */
const LoadingState = ({ message = "Chargement...", className = "" }) => {
  return (
    <div className={`text-center py-10 text-gray-600 ${className}`}>
      <div className="flex items-center justify-center space-x-2">
        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default LoadingState;