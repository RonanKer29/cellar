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
import { Wine, Plus, Package, Archive } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { filterBottlesByView, BOTTLE_VIEWS, calculateBottleStatsByView } from "../utils/bottleFilters";

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
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentView, setCurrentView] = useState(BOTTLE_VIEWS.STOCK);

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

  // Apply view filter first, then search/category filters  
  const viewFilteredBottles = filterBottlesByView(bottles, currentView);
  const filteredBottles = viewFilteredBottles.filter((bottle) => {
    const matchesSearch = [
      bottle.name,
      bottle.productor,
      bottle.region,
      bottle.year?.toString(),
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesColor =
      selectedColor === "Tous" || bottle.color === selectedColor;
    const matchesRegion =
      selectedRegion === "Tous" || bottle.region === selectedRegion;
    const matchesProductor =
      selectedProductor === "Tous" || bottle.productor === selectedProductor;

    const price = bottle.price || 0;
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

    return (
      matchesSearch &&
      matchesColor &&
      matchesRegion &&
      matchesProductor &&
      matchesPrice
    );
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

  // Contenu du bas du header
  const headerBottomContent = (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
      <div className="flex items-center space-x-4">
        <Badge variant="secondary" className="badge text-xs px-2 py-1">
          {filteredBottles.length} sur {bottles.length} bouteilles
        </Badge>
        {filteredBottles.length !== bottles.length && (
          <span className="text-sm text-gray-600">Filtres appliqués</span>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-4 pb-16 space-y-6">
      <ColorfulPageHeader
        title="Ma Cave"
        subtitle="Gérez et explorez votre collection de vins"
        icon={Wine}
        theme="green"
        bottomContent={headerBottomContent}
      />

      <MaCaveStats bottles={filteredBottles} />

      {/* Sélecteur de vue */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-gray-700">Vue d'affichage</h3>
          <div className="flex gap-2">
            <Button
              variant={currentView === BOTTLE_VIEWS.STOCK ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentView(BOTTLE_VIEWS.STOCK)}
              className="flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Stock actuel ({calculateBottleStatsByView(bottles).inStock.totalQuantity})
            </Button>
            <Button
              variant={currentView === BOTTLE_VIEWS.COLLECTION ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentView(BOTTLE_VIEWS.COLLECTION)}
              className="flex items-center gap-2"
            >
              <Archive className="w-4 h-4" />
              Collection complète ({calculateBottleStatsByView(bottles).collection.count})
            </Button>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {currentView === BOTTLE_VIEWS.STOCK ? 
            "Affichage des bouteilles disponibles en stock" : 
            "Affichage de toutes les bouteilles (stock + consommées)"
          }
        </div>
      </div>

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
      <MaCaveGrid bottles={sortedBottles} />
    </div>
  );
};

export default MaCave;
