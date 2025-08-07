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
import { Wine, Plus, Package, Archive, BookOpen, WineIcon } from "lucide-react";
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

      {/* Onglets de navigation */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            <button
              onClick={() => setCurrentView(BOTTLE_VIEWS.STOCK)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                currentView === BOTTLE_VIEWS.STOCK
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <WineIcon className="w-4 h-4" />
                <span>En Cave</span>
                <Badge variant={currentView === BOTTLE_VIEWS.STOCK ? "default" : "secondary"} className="ml-2">
                  {calculateBottleStatsByView(bottles).inStock.totalQuantity}
                </Badge>
              </div>
            </button>
            <button
              onClick={() => setCurrentView(BOTTLE_VIEWS.CONSUMED)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                currentView === BOTTLE_VIEWS.CONSUMED
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Wine className="w-4 h-4" />
                <span>Dégustées</span>
                <Badge variant={currentView === BOTTLE_VIEWS.CONSUMED ? "default" : "secondary"} className="ml-2">
                  {calculateBottleStatsByView(bottles).consumed.count}
                </Badge>
              </div>
            </button>
            <button
              onClick={() => setCurrentView(BOTTLE_VIEWS.COLLECTION)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                currentView === BOTTLE_VIEWS.COLLECTION
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Collection</span>
                <Badge variant={currentView === BOTTLE_VIEWS.COLLECTION ? "default" : "secondary"} className="ml-2">
                  {calculateBottleStatsByView(bottles).collection.count}
                </Badge>
              </div>
            </button>
          </nav>
        </div>
        <div className="px-6 py-4">
          <p className="text-sm text-gray-600">
            {currentView === BOTTLE_VIEWS.STOCK && 
              "Bouteilles actuellement disponibles dans votre cave"
            }
            {currentView === BOTTLE_VIEWS.CONSUMED && 
              "Historique des bouteilles que vous avez dégustées"
            }
            {currentView === BOTTLE_VIEWS.COLLECTION && 
              "Vue complète de toute votre collection avec historique"
            }
          </p>
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
