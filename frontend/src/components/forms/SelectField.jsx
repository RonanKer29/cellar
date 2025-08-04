/**
 * @fileoverview Composant de champ de sélection (dropdown) standardisé
 * Fournit une liste déroulante réutilisable avec label et options configurables
 */

/**
 * Champ de sélection standardisé avec label et options
 * Composant réutilisable pour les listes déroulantes de formulaire
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.label - Libellé du champ affiché au-dessus du select
 * @param {string} props.name - Nom du champ pour l'attribut name du select
 * @param {string} props.value - Valeur actuellement sélectionnée
 * @param {Function} props.onChange - Fonction de callback lors du changement de sélection
 * @param {Array<Object>} [props.options=[]] - Liste des options disponibles
 * @param {string} props.options[].value - Valeur de l'option
 * @param {string} props.options[].label - Texte affiché pour l'option
 * @param {boolean} [props.required=false] - Indique si le champ est obligatoire
 * @param {string} [props.className=""] - Classes CSS supplémentaires pour le select
 * 
 * @example
 * // Sélection de type de vin
 * <SelectField 
 *   label="Type de vin"
 *   name="color"
 *   value={formData.color}
 *   onChange={handleChange}
 *   options={[
 *     { value: "", label: "Choisir un type" },
 *     { value: "Rouge", label: "Rouge" },
 *     { value: "Blanc", label: "Blanc" },
 *     { value: "Rosé", label: "Rosé" }
 *   ]}
 *   required
 * />
 * 
 * @example
 * // Sélection de région avec options dynamiques
 * <SelectField 
 *   label="Région"
 *   name="region"
 *   value={formData.region}
 *   onChange={handleChange}
 *   options={regions.map(region => ({ 
 *     value: region.id, 
 *     label: region.name 
 *   }))}
 * />
 * 
 * @returns {JSX.Element} Champ de sélection avec label et options stylisées
 */
const SelectField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options = [], 
  required = false,
  className = "" 
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && "*"}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;