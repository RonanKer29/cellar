import { useState } from "react";
import { useWines } from "../hooks/useWines";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import MaCaveHeader from "../components/cave/MaCaveHeader";
import MaCaveFilters from "../components/cave/MaCaveFilters";
import MaCaveGrid from "../components/cave/MaCaveGrid";
import MaCaveStats from "../components/cave/MaCaveStats";

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

  return (
    <div className="p-4 space-y-6">
      <MaCaveHeader 
        totalBottles={bottles.length}
        filteredBottles={filteredBottles.length}
        viewMode={viewMode}
        setViewMode={setViewMode}
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