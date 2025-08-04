/**
 * @fileoverview Composant d'affichage des états d'erreur dans l'application
 * Fournit une interface utilisateur cohérente pour les erreurs avec option de réessai
 */

/**
 * Composant d'état d'erreur avec message personnalisable et bouton de réessai
 * Affiche les erreurs de manière user-friendly avec possibilité de récupération
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.message - Message d'erreur principal à afficher à l'utilisateur
 * @param {string} [props.error] - Détails techniques de l'erreur (optionnel, affiché dans un bloc de code)
 * @param {Function} [props.onRetry] - Fonction de callback pour tenter une nouvelle opération
 * @param {string} [props.className=""] - Classes CSS supplémentaires pour personnaliser l'apparence
 * 
 * @example
 * // Erreur simple
 * <ErrorState message="Impossible de charger les données" />
 * 
 * @example
 * // Erreur avec détails techniques et bouton de réessai
 * <ErrorState 
 *   message="Erreur de connexion à l'API"
 *   error="Network Error: timeout of 5000ms exceeded"
 *   onRetry={() => refetchData()}
 *   className="my-4"
 * />
 * 
 * @returns {JSX.Element} Interface d'erreur avec message, détails optionnels et bouton de réessai
 */
const ErrorState = ({ 
  message, 
  error, 
  onRetry, 
  className = "" 
}) => {
  return (
    <div className={`text-center py-10 text-red-600 ${className}`}>
      <div className="space-y-3">
        <p className="text-lg">❌ {message}</p>
        {error && (
          <pre className="text-sm bg-red-50 p-3 rounded-lg text-left max-w-md mx-auto overflow-auto">
            {error}
          </pre>
        )}
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Réessayer
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;