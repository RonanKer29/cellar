/**
 * Configuration unifiée des couleurs des vins
 * Système cohérent pour toute l'application
 */

export const WINE_COLOR_SYSTEM = {
  Rouge: {
    // Couleur principale
    primary: 'bg-red-500',
    // Dégradés
    gradient: 'from-red-500 to-red-600',
    gradientFull: 'bg-gradient-to-r from-red-500 to-red-600',
    // Backgrounds
    light: 'bg-red-50',
    medium: 'bg-red-100',
    // Borders
    border: 'border-red-300',
    borderLight: 'border-red-200',
    // Text colors
    text: 'text-red-700',
    textLight: 'text-red-600',
    // Badge styles
    badge: 'border-red-300 text-red-700 bg-red-50',
    // Card header
    cardHeader: 'bg-gradient-to-br from-red-50 to-red-100 border-red-200'
  },
  
  Blanc: {
    // Couleur principale
    primary: 'bg-amber-400',
    // Dégradés
    gradient: 'from-amber-400 to-amber-500',
    gradientFull: 'bg-gradient-to-r from-amber-400 to-amber-500',
    // Backgrounds
    light: 'bg-amber-50',
    medium: 'bg-amber-100',
    // Borders
    border: 'border-amber-300',
    borderLight: 'border-amber-200',
    // Text colors
    text: 'text-amber-700',
    textLight: 'text-amber-600',
    // Badge styles
    badge: 'border-amber-300 text-amber-700 bg-amber-50',
    // Card header
    cardHeader: 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200'
  },
  
  Rosé: {
    // Couleur principale
    primary: 'bg-rose-400',
    // Dégradés
    gradient: 'from-rose-400 to-rose-500',
    gradientFull: 'bg-gradient-to-r from-rose-400 to-rose-500',
    // Backgrounds
    light: 'bg-rose-50',
    medium: 'bg-rose-100',
    // Borders
    border: 'border-rose-300',
    borderLight: 'border-rose-200',
    // Text colors
    text: 'text-rose-700',
    textLight: 'text-rose-600',
    // Badge styles
    badge: 'border-rose-300 text-rose-700 bg-rose-50',
    // Card header
    cardHeader: 'bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200'
  },
  
  Pétillant: {
    // Couleur principale
    primary: 'bg-indigo-500',
    // Dégradés
    gradient: 'from-indigo-500 to-indigo-600',
    gradientFull: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
    // Backgrounds
    light: 'bg-indigo-50',
    medium: 'bg-indigo-100',
    // Borders
    border: 'border-indigo-300',
    borderLight: 'border-indigo-200',
    // Text colors
    text: 'text-indigo-700',
    textLight: 'text-indigo-600',
    // Badge styles
    badge: 'border-indigo-300 text-indigo-700 bg-indigo-50',
    // Card header
    cardHeader: 'bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200'
  }
};

/**
 * Obtient les classes CSS pour une couleur de vin donnée
 * @param {string} wineColor - La couleur du vin ('Rouge', 'Blanc', 'Rosé', 'Pétillant')
 * @param {string} type - Le type de style ('primary', 'gradient', 'light', 'badge', etc.)
 * @returns {string} Les classes CSS correspondantes
 */
export const getWineColorClass = (wineColor, type = 'primary') => {
  const colorSystem = WINE_COLOR_SYSTEM[wineColor];
  if (!colorSystem) {
    // Couleur par défaut pour les vins non reconnus
    const defaultClasses = {
      primary: 'bg-gray-400',
      gradient: 'from-gray-400 to-gray-500',
      gradientFull: 'bg-gradient-to-r from-gray-400 to-gray-500',
      light: 'bg-gray-50',
      medium: 'bg-gray-100',
      border: 'border-gray-300',
      borderLight: 'border-gray-200',
      text: 'text-gray-700',
      textLight: 'text-gray-600',
      badge: 'border-gray-300 text-gray-700 bg-gray-50',
      cardHeader: 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
    };
    return defaultClasses[type] || defaultClasses.primary;
  }
  
  return colorSystem[type] || colorSystem.primary;
};

/**
 * Obtient toutes les classes d'une couleur de vin
 * @param {string} wineColor - La couleur du vin
 * @returns {Object} Objet contenant toutes les classes CSS
 */
export const getWineColorSystem = (wineColor) => {
  return WINE_COLOR_SYSTEM[wineColor] || WINE_COLOR_SYSTEM.Rouge;
};

/**
 * Liste des couleurs de vin disponibles
 */
export const WINE_COLORS_LIST = Object.keys(WINE_COLOR_SYSTEM);