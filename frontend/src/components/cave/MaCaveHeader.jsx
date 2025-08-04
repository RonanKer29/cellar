import { Grid3X3, List, Wine, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";

const MaCaveHeader = ({ totalBottles, filteredBottles, viewMode, setViewMode }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-6 py-6 border-b space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-xl">
            <Wine className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ma Cave</h1>
            <p className="text-sm text-gray-600">
              Gérez et explorez votre collection de vins
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link to="/ajouter-vin">
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Ajouter un vin</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats and View Controls */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-6 py-4 space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="text-sm">
            {filteredBottles} sur {totalBottles} bouteilles
          </Badge>
          {filteredBottles !== totalBottles && (
            <span className="text-sm text-gray-500">
              Filtres appliqués
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 mr-2">Affichage:</span>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="flex items-center space-x-1"
          >
            <Grid3X3 className="w-4 h-4" />
            <span className="hidden sm:inline">Grille</span>
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="flex items-center space-x-1"
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Liste</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MaCaveHeader;