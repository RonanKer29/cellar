/**
 * @fileoverview Composant de champ de formulaire standardisé
 * Fournit un champ d'entrée réutilisable avec label et style cohérent
 */

/**
 * Champ de formulaire standardisé avec label et validation
 * Composant réutilisable pour tous les types d'entrées de formulaire
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.label - Libellé du champ affiché au-dessus de l'input
 * @param {string} props.name - Nom du champ pour l'attribut name de l'input
 * @param {string|number} props.value - Valeur actuelle du champ
 * @param {Function} props.onChange - Fonction de callback lors du changement de valeur
 * @param {string} [props.type="text"] - Type d'input HTML (text, email, password, number, etc.)
 * @param {string} [props.placeholder] - Texte d'aide affiché dans le champ vide
 * @param {boolean} [props.required=false] - Indique si le champ est obligatoire
 * @param {string} [props.className=""] - Classes CSS supplémentaires pour l'input
 * @param {...Object} props - Autres propriétés HTML passées à l'input
 * 
 * @example
 * // Champ texte simple
 * <FormField 
 *   label="Nom du vin"
 *   name="name"
 *   value={formData.name}
 *   onChange={handleChange}
 *   placeholder="Ex: Château Margaux"
 *   required
 * />
 * 
 * @example
 * // Champ numérique avec validation
 * <FormField 
 *   label="Prix"
 *   name="price"
 *   type="number"
 *   value={formData.price}
 *   onChange={handleChange}
 *   min="0"
 *   step="0.01"
 * />
 * 
 * @returns {JSX.Element} Champ de formulaire avec label et input stylisé
 */
const FormField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = "text", 
  placeholder, 
  required = false,
  className = "",
  ...props 
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && "*"}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${className}`}
        {...props}
      />
    </div>
  );
};

export default FormField;