import { useState } from "react";
import { Search, X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const MaCaveFilters = ({
  searchTerm,
  setSearchTerm,
  colors,
  selectedColor,
  setSelectedColor,
  regions,
  selectedRegion,
  setSelectedRegion,
  productors,
  selectedProductor,
  setSelectedProductor,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  priceRange,
  setPriceRange
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedColor("Tous");
    setSelectedRegion("Tous");
    setSelectedProductor("Tous");
    setPriceRange([0, 1000]);
  };

  const hasActiveFilters = 
    searchTerm !== "" || 
    selectedColor !== "Tous" || 
    selectedRegion !== "Tous" || 
    selectedProductor !== "Tous" ||
    priceRange[0] !== 0 || 
    priceRange[1] !== 1000;

  const sortOptions = [
    { value: "name", label: "Nom" },
    { value: "year", label: "Millésime" },
    { value: "price", label: "Prix" },
    { value: "region", label: "Région" },
    { value: "quantity", label: "Quantité" }
  ];

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-6 py-4 border-b space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-semibold text-gray-800">Recherche et filtres</h2>
          {hasActiveFilters && (
            <Badge variant="secondary">Filtres actifs</Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center space-x-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filtres avancés</span>
          </Button>
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-red-600 hover:text-red-800"
            >
              Tout effacer
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par nom, producteur, région, millésime..."
            className="pl-9 pr-10 h-10"
          />
          {searchTerm && (
            <Button
              onClick={() => setSearchTerm("")}
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Quick Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Type de vin</label>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                {colors.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Région</label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Toutes les régions" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Producteur</label>
            <Select value={selectedProductor} onValueChange={setSelectedProductor}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tous les producteurs" />
              </SelectTrigger>
              <SelectContent>
                {productors.map((productor) => (
                  <SelectItem key={productor} value={productor}>
                    {productor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="border-t pt-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Sorting */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Trier par</label>
                <div className="flex space-x-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    className="flex-shrink-0"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Fourchette de prix: {priceRange[0]}€ - {priceRange[1]}€
                </label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    placeholder="Min"
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    placeholder="Max"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaCaveFilters;