/**
 * Service de gestion de l'historique des bouteilles
 * Utilise localStorage pour stocker les événements de consommation
 */

const HISTORY_KEY = 'cave_history';

/**
 * Types d'événements possibles
 */
export const EVENT_TYPES = {
  ADDED: 'added',
  CONSUMED: 'consumed',
  DELETED: 'deleted'
};

/**
 * Récupère l'historique depuis localStorage
 * @returns {Array} Liste des événements d'historique
 */
export const getHistory = () => {
  try {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'historique:', error);
    return [];
  }
};

/**
 * Sauvegarde l'historique dans localStorage
 * @param {Array} history - Liste des événements
 */
const saveHistory = (history) => {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de l\'historique:', error);
  }
};

/**
 * Ajoute un événement à l'historique
 * @param {Object} event - Événement à ajouter
 * @param {string} event.type - Type d'événement (added, consumed, deleted)
 * @param {number} event.bottleId - ID de la bouteille
 * @param {string} event.bottleName - Nom de la bouteille
 * @param {string} event.bottleProductor - Producteur
 * @param {number} event.bottleYear - Millésime
 * @param {string} event.bottleColor - Couleur du vin
 * @param {number} event.quantity - Quantité concernée
 * @param {string} [event.date] - Date de l'événement (ISO string, défaut: maintenant)
 */
export const addHistoryEvent = (event) => {
  const history = getHistory();
  const newEvent = {
    id: Date.now() + Math.random(), // ID unique simple
    ...event,
    date: event.date || new Date().toISOString()
  };
  
  history.push(newEvent);
  saveHistory(history);
  return newEvent;
};

/**
 * Récupère l'historique d'une bouteille spécifique
 * @param {number} bottleId - ID de la bouteille
 * @returns {Array} Événements liés à cette bouteille
 */
export const getBottleHistory = (bottleId) => {
  const history = getHistory();
  return history
    .filter(event => event.bottleId === parseInt(bottleId))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

/**
 * Récupère les événements récents (derniers N jours)
 * @param {number} days - Nombre de jours à considérer
 * @returns {Array} Événements récents triés par date
 */
export const getRecentHistory = (days = 30) => {
  const history = getHistory();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return history
    .filter(event => new Date(event.date) >= cutoffDate)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

/**
 * Récupère les statistiques de consommation par mois
 * @param {number} months - Nombre de mois à analyser
 * @returns {Array} Statistiques mensuelles
 */
export const getMonthlyConsumptionStats = (months = 12) => {
  const history = getHistory();
  const now = new Date();
  const stats = [];
  
  for (let i = months - 1; i >= 0; i--) {
    const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEvents = history.filter(event => {
      if (event.type !== EVENT_TYPES.CONSUMED) return false;
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === targetDate.getFullYear() &&
             eventDate.getMonth() === targetDate.getMonth();
    });
    
    stats.push({
      month: targetDate.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }),
      date: targetDate,
      count: monthEvents.reduce((sum, event) => sum + event.quantity, 0),
      events: monthEvents
    });
  }
  
  return stats;
};

/**
 * Nettoie l'historique (pour maintenance)
 * @param {number} maxAge - Âge maximum en jours
 */
export const cleanupHistory = (maxAge = 365) => {
  const history = getHistory();
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - maxAge);
  
  const cleanedHistory = history.filter(event => 
    new Date(event.date) >= cutoffDate
  );
  
  saveHistory(cleanedHistory);
  return cleanedHistory.length;
};

/**
 * Importe des événements depuis les bouteilles existantes (migration initiale)
 * @param {Array} bottles - Liste des bouteilles
 */
export const migrateFromBottles = (bottles) => {
  const history = getHistory();
  const existingIds = new Set(history.map(h => `${h.bottleId}-${h.type}`));
  
  bottles.forEach(bottle => {
    // Ajouter l'événement d'ajout si pas déjà présent
    const addKey = `${bottle.id}-${EVENT_TYPES.ADDED}`;
    if (!existingIds.has(addKey)) {
      addHistoryEvent({
        type: EVENT_TYPES.ADDED,
        bottleId: bottle.id,
        bottleName: bottle.name,
        bottleProductor: bottle.productor,
        bottleYear: bottle.year,
        bottleColor: bottle.color,
        quantity: bottle.quantity,
        date: bottle.date_added
      });
    }
    
    // Si la bouteille est marquée comme "Bue", ajouter un événement de consommation
    if (bottle.status === "Bue") {
      const consumeKey = `${bottle.id}-${EVENT_TYPES.CONSUMED}`;
      if (!existingIds.has(consumeKey)) {
        addHistoryEvent({
          type: EVENT_TYPES.CONSUMED,
          bottleId: bottle.id,
          bottleName: bottle.name,
          bottleProductor: bottle.productor,
          bottleYear: bottle.year,
          bottleColor: bottle.color,
          quantity: bottle.quantity,
          date: bottle.date_added // On utilise date_added comme approximation
        });
      }
    }
  });
};