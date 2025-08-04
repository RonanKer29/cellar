import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/ui/combobox";
import { Card, CardContent } from "@/components/ui/card";
import { GRAPE_VARIETIES } from "@/data/wine-data";

const GrapeVarietyInput = ({ value = "", onChange }) => {
  // Parse existing string value into array format
  const parseGrapeString = (str) => {
    if (!str || typeof str !== 'string') {
      return [{ variety: "", percentage: "" }];
    }
    
    const grapes = str.split(',').map(grape => {
      const trimmed = grape.trim();
      const percentageMatch = trimmed.match(/^(.+?)\s*\((\d+(?:\.\d+)?)%\)$/);
      
      if (percentageMatch) {
        return {
          variety: percentageMatch[1].trim(),
          percentage: percentageMatch[2]
        };
      } else {
        return {
          variety: trimmed,
          percentage: ""
        };
      }
    }).filter(grape => grape.variety);
    
    return grapes.length > 0 ? grapes : [{ variety: "", percentage: "" }];
  };

  const [grapeVarieties, setGrapeVarieties] = useState(() => parseGrapeString(value));

  useEffect(() => {
    setGrapeVarieties(parseGrapeString(value));
  }, [value]);

  const updateGrapeVarieties = (newVarieties) => {
    setGrapeVarieties(newVarieties);
    
    // Convertir en format string pour la compatibilité backend
    const grapeString = newVarieties
      .filter(grape => grape.variety.trim())
      .map(grape => {
        if (grape.percentage && grape.percentage.trim()) {
          return `${grape.variety.trim()} (${grape.percentage.trim()}%)`;
        }
        return grape.variety.trim();
      })
      .join(", ");
    
    onChange(grapeString);
  };

  const addGrapeVariety = () => {
    const newVarieties = [...grapeVarieties, { variety: "", percentage: "" }];
    updateGrapeVarieties(newVarieties);
  };

  const removeGrapeVariety = (index) => {
    if (grapeVarieties.length > 1) {
      const newVarieties = grapeVarieties.filter((_, i) => i !== index);
      updateGrapeVarieties(newVarieties);
    }
  };

  const updateVariety = (index, field, value) => {
    const newVarieties = grapeVarieties.map((grape, i) => {
      if (i === index) {
        return { ...grape, [field]: value };
      }
      return grape;
    });
    updateGrapeVarieties(newVarieties);
  };

  const getTotalPercentage = () => {
    return grapeVarieties.reduce((total, grape) => {
      const percentage = parseFloat(grape.percentage) || 0;
      return total + percentage;
    }, 0);
  };

  const totalPercentage = getTotalPercentage();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-gray-700">
          Cépages et pourcentages
        </Label>
        {totalPercentage > 0 && (
          <span className={`text-sm font-medium px-2 py-1 rounded ${
            totalPercentage === 100 
              ? "text-green-700 bg-green-100" 
              : totalPercentage > 100 
                ? "text-red-700 bg-red-100"
                : "text-orange-700 bg-orange-100"
          }`}>
            Total: {totalPercentage}%
          </span>
        )}
      </div>

      <div className="space-y-3">
        {grapeVarieties.map((grape, index) => (
          <Card key={index} className="p-3">
            <CardContent className="p-0">
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <Label className="text-xs text-gray-600 mb-1 block">
                    Cépage {index + 1}
                  </Label>
                  <Combobox
                    options={GRAPE_VARIETIES}
                    value={grape.variety}
                    onValueChange={(value) => updateVariety(index, "variety", value)}
                    placeholder="Sélectionner un cépage..."
                    searchPlaceholder="Rechercher un cépage..."
                    allowCustom={true}
                    className="w-full"
                  />
                </div>
                
                <div className="w-24">
                  <Label className="text-xs text-gray-600 mb-1 block">
                    % (optionnel)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={grape.percentage}
                    onChange={(e) => updateVariety(index, "percentage", e.target.value)}
                    placeholder="0"
                    className="text-center"
                  />
                </div>

                <div className="flex gap-1">
                  {grapeVarieties.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeGrapeVariety(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={addGrapeVariety}
        className="w-full border-dashed border-2 text-gray-600 hover:text-gray-800 hover:border-gray-400"
      >
        <Plus className="w-4 h-4 mr-2" />
        Ajouter un cépage
      </Button>

      {totalPercentage > 100 && (
        <p className="text-sm text-red-600">
          ⚠️ Le total des pourcentages dépasse 100%
        </p>
      )}
    </div>
  );
};

export default GrapeVarietyInput;