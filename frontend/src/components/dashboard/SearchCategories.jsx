import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const SearchCategories = ({ searchTerm, setSearchTerm }) => {
  const clearSearch = () => {
    setSearchTerm("");
  };

  const searchExamples = [
    { label: "Bordeaux", value: "Bordeaux" },
    { label: "2018", value: "2018" },
    { label: "Château", value: "Château" },
    { label: "Pinot Noir", value: "Pinot Noir" },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 sm:px-6 py-4 border-b space-y-2 sm:space-y-0">
        <h2 className="text-xl font-semibold text-gray-800">Recherche</h2>
        {searchTerm && (
          <Badge variant="secondary" className="self-start sm:self-auto">
            {searchTerm.length} caractère{searchTerm.length > 1 ? 's' : ''}
          </Badge>
        )}
      </div>

      {/* Search Input */}
      <div className="px-4 sm:px-6 py-4">
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
              onClick={clearSearch}
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
              aria-label="Effacer la recherche"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Search suggestions/tips */}
        {!searchTerm && (
          <div className="mt-4 space-y-2">
            <span className="text-xs text-muted-foreground">Exemples de recherche:</span>
            <div className="flex flex-wrap gap-2">
              {searchExamples.map((example) => (
                <Badge
                  key={example.value}
                  variant="outline"
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setSearchTerm(example.value)}
                >
                  {example.label}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Active search indicator */}
        {searchTerm && (
          <div className="mt-4 flex items-center justify-between p-3 bg-accent/50 rounded-lg border">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">
                Recherche active: <strong>"{searchTerm}"</strong>
              </span>
            </div>
            <Button
              onClick={clearSearch}
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
            >
              Effacer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCategories;
