/**
 * @fileoverview Composant de saisie avancée des cépages avec pourcentages
 * Permet la gestion dynamique des assemblages de vins avec validation des pourcentages
 */

import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Combobox } from "../ui/combobox";
import { Card, CardContent } from "../ui/card";
import { GRAPE_VARIETIES } from "../../data/wine-data";

/**
 * Composant avancé de saisie des cépages avec gestion des pourcentages
 * Permet d'ajouter/supprimer des cépages et de définir leur proportion dans l'assemblage
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} [props.value=""] - Valeur actuelle au format string "Cépage1 (50%), Cépage2 (30%)"
 * @param {Function} props.onChange - Fonction de callback lors du changement de valeur
 * @param {Function} [props.onValidationChange] - Fonction de callback pour les changements de validation
 * 
 * @example
 * // Utilisation basique
 * <GrapeVarietyInput 
 *   value="Cabernet Sauvignon (60%), Merlot (40%)"
 *   onChange={(value) => setFormData({...formData, grapes: value})}
 * />
 * 
 * @example  
 * // Assemblage complexe
 * <GrapeVarietyInput 
 *   value="Chardonnay (70%), Pinot Noir (20%), Pinot Meunier (10%)"
 *   onChange={handleGrapesChange}
 * />
 * 
 * @returns {JSX.Element} Interface dynamique de saisie des cépages avec validation
 */
const GrapeVarietyInput = ({ value = "", onChange, onValidationChange }) => {
  /**
   * Parse une chaîne de caractères de cépages en tableau d'objets
   * Gère les formats: "Cépage", "Cépage (X%)", "Cépage1, Cépage2 (X%)"
   * @param {string} str - Chaîne à parser
   * @returns {Array<Object>} Tableau d'objets {variety, percentage}
   */
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

  /**
   * Vérifie si la composition des cépages est valide
   * @param {Array<Object>} varieties - Liste des cépages à vérifier
   * @returns {Object} Objet avec les informations de validation
   */
  const validateGrapeComposition = (varieties) => {
    const hasPercentages = varieties.some(grape => grape.percentage && grape.percentage.trim());
    
    if (!hasPercentages) {
      // Pas de pourcentages = valide (optionnel)
      return {
        isValid: true,
        hasPercentages: false,
        totalPercentage: 0,
        message: ""
      };
    }

    // Si au moins un pourcentage est renseigné, tous doivent l'être et total = 100%
    const grapesMissingPercentage = varieties.filter(grape => 
      grape.variety.trim() && (!grape.percentage || !grape.percentage.trim())
    );

    if (grapesMissingPercentage.length > 0) {
      return {
        isValid: false,
        hasPercentages: true,
        totalPercentage: 0,
        message: "Si vous renseignez des pourcentages, tous les cépages doivent avoir leur pourcentage."
      };
    }

    const totalPercentage = varieties.reduce((total, grape) => {
      const percentage = parseFloat(grape.percentage) || 0;
      return total + percentage;
    }, 0);

    return {
      isValid: totalPercentage === 100,
      hasPercentages: true,
      totalPercentage,
      message: totalPercentage !== 100 ? "Le total des pourcentages doit être égal à 100%." : ""
    };
  };

  /**
   * Met à jour la liste des cépages et synchronise avec le parent
   * Convertit le format objet en string pour la compatibilité backend
   * @param {Array<Object>} newVarieties - Nouvelle liste des cépages
   */
  const updateGrapeVarieties = (newVarieties) => {
    setGrapeVarieties(newVarieties);
    
    // Validation
    const validation = validateGrapeComposition(newVarieties);
    if (onValidationChange) {
      onValidationChange(validation);
    }
    
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

  /**
   * Ajoute un nouveau cépage vide à la liste
   */
  const addGrapeVariety = () => {
    const newVarieties = [...grapeVarieties, { variety: "", percentage: "" }];
    updateGrapeVarieties(newVarieties);
  };

  /**
   * Supprime un cépage de la liste (au minimum 1 cépage doit rester)
   * @param {number} index - Index du cépage à supprimer
   */
  const removeGrapeVariety = (index) => {
    if (grapeVarieties.length > 1) {
      const newVarieties = grapeVarieties.filter((_, i) => i !== index);
      updateGrapeVarieties(newVarieties);
    }
  };

  /**
   * Met à jour un champ spécifique d'un cépage
   * @param {number} index - Index du cépage à modifier
   * @param {string} field - Champ à modifier ('variety' ou 'percentage')
   * @param {string} value - Nouvelle valeur
   */
  const updateVariety = (index, field, value) => {
    const newVarieties = grapeVarieties.map((grape, i) => {
      if (i === index) {
        return { ...grape, [field]: value };
      }
      return grape;
    });
    updateGrapeVarieties(newVarieties);
  };

  /**
   * Calcule le pourcentage total de tous les cépages
   * @returns {number} Somme des pourcentages (0-100+)
   */
  const getTotalPercentage = () => {
    return grapeVarieties.reduce((total, grape) => {
      const percentage = parseFloat(grape.percentage) || 0;
      return total + percentage;
    }, 0);
  };

  const totalPercentage = getTotalPercentage();
  const validation = validateGrapeComposition(grapeVarieties);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-gray-700">
          Cépages et pourcentages
        </Label>
        {validation.hasPercentages && (
          <span className={`text-sm font-medium px-2 py-1 rounded ${
            validation.isValid
              ? "text-green-700 bg-green-100" 
              : "text-red-700 bg-red-100"
          }`}>
            Total: {validation.totalPercentage}%
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

      {validation.hasPercentages && !validation.isValid && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700 font-medium">
            ⚠️ {validation.message}
          </p>
          {validation.hasPercentages && (
            <p className="text-xs text-red-600 mt-1">
              Enregistrement impossible tant que le total n'est pas égal à 100%.
            </p>
          )}
        </div>
      )}

      {validation.hasPercentages && validation.isValid && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700 font-medium">
            ✅ Composition parfaite ! Total des cépages : 100%
          </p>
        </div>
      )}
    </div>
  );
};

export default GrapeVarietyInput;