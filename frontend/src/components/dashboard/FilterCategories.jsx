import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const FilterCategories = ({
  colors,
  selectedColor,
  setSelectedColor,
  regions,
  selectedRegion,
  setSelectedRegion,
  productors,
  selectedProductor,
  setSelectedProductor,
}) => {
  const clearFilters = () => {
    setSelectedColor(colors[0]);
    setSelectedRegion(regions[0]);
    setSelectedProductor(productors[0]);
  };

  const hasActiveFilters = selectedColor !== colors[0] || selectedRegion !== regions[0] || selectedProductor !== productors[0];

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-6 py-4 border-b space-y-2 sm:space-y-0">
        <h2 className="text-xl font-semibold text-gray-800">Filtres</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200 self-start sm:self-auto"
          >
            Effacer les filtres
          </button>
        )}
      </div>

      {/* Desktop Filter Layout */}
      <div className="hidden lg:block px-4 sm:px-6 py-4">
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Type de vin</label>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner un type" />
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
                <SelectValue placeholder="Sélectionner une région" />
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
                <SelectValue placeholder="Sélectionner un producteur" />
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
      </div>

      {/* Mobile/Tablet Filter Layout */}
      <div className="block lg:hidden px-4 sm:px-6 py-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Type de vin</label>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner un type" />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Région</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner une région" />
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
                  <SelectValue placeholder="Sélectionner un producteur" />
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
        </div>
      </div>
    </div>
  );
};

export default FilterCategories;
