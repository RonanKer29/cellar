/**
 * @fileoverview En-tête de la page des statistiques avec actions et informations
 * Affiche le titre, les métriques principales et les boutons d'action
 */

import { BarChart3, TrendingUp, Download, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

/**
 * En-tête principal de la page des statistiques
 * Fournit le contexte, les actions et un résumé de la collection analysée
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {number} props.totalBottles - Nombre total de bouteilles dans la collection
 * 
 * @example
 * <StatsHeader totalBottles={150} />
 * 
 * @returns {JSX.Element} En-tête avec titre, badges informatifs et boutons d'action
 */
const StatsHeader = ({ totalBottles }) => {
  /**
   * Gère l'export des données statistiques (fonctionnalité future)
   * @todo Implémenter l'export réel des données en CSV/PDF
   */  
  const handleExportData = () => {
    // Placeholder for future export functionality
    alert("Fonctionnalité d'export à venir !");
  };

  const currentDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-6 py-6 border-b space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-xl">
            <BarChart3 className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Statistiques</h1>
            <p className="text-sm text-gray-600">
              Analysez votre collection de vins en détail
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            onClick={handleExportData}
            className="flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Exporter</span>
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-6 py-4 space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="text-sm flex items-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>{totalBottles} bouteilles analysées</span>
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>Dernière mise à jour: {currentDate}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsHeader;