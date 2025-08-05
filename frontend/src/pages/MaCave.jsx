/**
 * @fileoverview Page principale de gestion de la cave à vin personnelle
 * Interface complète avec filtres, tri, statistiques et modes d'affichage
 */

import { useState } from "react";
import { useWines } from "../hooks/useWines";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import ColorfulPageHeader from "../components/common/ColorfulPageHeader";
import MaCaveFilters from "../components/cave/MaCaveFilters";
import MaCaveGrid from "../components/cave/MaCaveGrid";
import MaCaveStats from "../components/cave/MaCaveStats";
import { Wine, Plus, Grid3X3, List } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Link } from "react-router-dom";

/**
 * Page principale de la cave à vin avec gestion complète de la collection
 * Centralise l'affichage, le filtrage, le tri et les statistiques des bouteilles
 * 
 * @example
 * // Navigation vers Ma Cave
 * <Link to="/ma-cave">Ma Cave</Link>
 * 
 * @returns {JSX.Element} Interface complète de gestion de la cave avec filtres et statistiques
 */
const MaCave = () => {
  const { bottles, loading, error, refetch } = useWines();
  
  // State for filters and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedColor, setSelectedColor] = useState("Tous");
  const [selectedRegion, setSelectedRegion] = useState("Tous");
  const [selectedProductor, setSelectedProductor] = useState("Tous");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState 
        message="Une erreur est survenue lors du chargement" 
        error={error} 
        onRetry={refetch}
      />
    );
  }

  // Extract unique values for filters
  const colors = ["Tous", ...Array.from(new Set(bottles.map((b) => b.color)))];
  const regions = [
    "Tous",
    ...Array.from(new Set(bottles.map((b) => b.region).filter(Boolean))),
  ];
  const productors = [
    "Tous",
    ...Array.from(new Set(bottles.map((b) => b.productor).filter(Boolean))),
  ];

  // Filter bottles
  const filteredBottles = bottles.filter((bottle) => {
    const matchesSearch = [bottle.name, bottle.productor, bottle.region, bottle.year?.toString()]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesColor = selectedColor === "Tous" || bottle.color === selectedColor;
    const matchesRegion = selectedRegion === "Tous" || bottle.region === selectedRegion;
    const matchesProductor = selectedProductor === "Tous" || bottle.productor === selectedProductor;
    
    const price = bottle.price || 0;
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

    return matchesSearch && matchesColor && matchesRegion && matchesProductor && matchesPrice;
  });

  // Sort bottles
  const sortedBottles = [...filteredBottles].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    // Handle special cases
    if (sortBy === "price") {
      aValue = a.price || 0;
      bValue = b.price || 0;
    }
    
    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Actions pour le header
  const headerActions = (
    <Link to="/ajouter-vin">
      <Button className="flex items-center space-x-2">
        <Plus className="w-4 h-4" />
        <span>Ajouter un vin</span>
      </Button>
    </Link>
  );

  // Contenu du bas du header
  const headerBottomContent = (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
      <div className="flex items-center space-x-4">
        <Badge variant="secondary" className="text-sm">
          {filteredBottles.length} sur {bottles.length} bouteilles
        </Badge>
        {filteredBottles.length !== bottles.length && (
          <span className="text-sm text-emerald-600/70">
            Filtres appliqués
          </span>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-sm text-emerald-600/70 mr-2">Affichage:</span>
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
  );

  return (
    <div className="p-4 space-y-6">
      <ColorfulPageHeader
        title="Ma Cave"
        subtitle="Gérez et explorez votre collection de vins"
        icon={Wine}
        theme="green"
        actions={headerActions}
        bottomContent={headerBottomContent}
      />
      
      <MaCaveStats bottles={filteredBottles} />
      
      <MaCaveFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        colors={colors}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        regions={regions}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        productors={productors}
        selectedProductor={selectedProductor}
        setSelectedProductor={setSelectedProductor}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
      
      <MaCaveGrid 
        bottles={sortedBottles}
        viewMode={viewMode}
      />
    </div>
  );
};

export default MaCave;