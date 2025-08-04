/**
 * @fileoverview Composant de route protégée pour l'authentification
 * Contrôle l'accès aux pages nécessitant une connexion utilisateur
 */

import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * Composant de route protégée avec vérification d'authentification
 * Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {React.ReactNode} props.children - Composants enfants à afficher si authentifié
 * 
 * @example
 * // Protection d'une route
 * <ProtectedRoute>
 *   <MaCave />
 * </ProtectedRoute>
 * 
 * @returns {JSX.Element} Enfants si authentifié, redirection sinon, ou écran de chargement
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
        <div className="text-center">
          <div className="inline-flex bg-gradient-to-br from-pink-600 to-purple-600 p-4 rounded-2xl shadow-lg mb-4 animate-pulse">
            <div className="w-10 h-10 bg-white/20 rounded"></div>
          </div>
          <p className="text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
