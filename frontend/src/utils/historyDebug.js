/**
 * Utilitaires de debug pour le système d'historique
 * À utiliser dans la console du navigateur pour tester
 */

import { getHistory, cleanupHistory, addHistoryEvent, EVENT_TYPES } from '../services/historyService';

/**
 * Affiche l'historique complet dans la console
 */
export const debugHistory = () => {
  const history = getHistory();
  console.log('=== HISTORIQUE COMPLET ===');
  console.log(`Total d'événements: ${history.length}`);
  
  const grouped = history.reduce((acc, event) => {
    if (!acc[event.type]) acc[event.type] = [];
    acc[event.type].push(event);
    return acc;
  }, {});
  
  Object.entries(grouped).forEach(([type, events]) => {
    console.log(`\n${type.toUpperCase()}: ${events.length} événements`);
    events.forEach(event => {
      console.log(`  - ${event.bottleName} (${event.quantity}x) - ${new Date(event.date).toLocaleDateString()}`);
    });
  });
  
  return history;
};

/**
 * Nettoie complètement l'historique (ATTENTION: irréversible)
 */
export const clearHistory = () => {
  localStorage.removeItem('cave_history');
  console.log('Historique effacé');
};

/**
 * Ajoute des événements de test
 */
export const addTestEvents = () => {
  const now = new Date();
  
  // Ajout d'une bouteille il y a 5 jours
  const fiveDaysAgo = new Date(now);
  fiveDaysAgo.setDate(now.getDate() - 5);
  
  addHistoryEvent({
    type: EVENT_TYPES.ADDED,
    bottleId: 999,
    bottleName: 'Test Bordeaux',
    bottleProductor: 'Château Test',
    bottleYear: 2020,
    bottleColor: 'Rouge',
    quantity: 6,
    date: fiveDaysAgo.toISOString()
  });
  
  // Consommation il y a 2 jours  
  const twoDaysAgo = new Date(now);
  twoDaysAgo.setDate(now.getDate() - 2);
  
  addHistoryEvent({
    type: EVENT_TYPES.CONSUMED,
    bottleId: 999,
    bottleName: 'Test Bordeaux',
    bottleProductor: 'Château Test',
    bottleYear: 2020,
    bottleColor: 'Rouge',
    quantity: 2,
    date: twoDaysAgo.toISOString()
  });
  
  console.log('Événements de test ajoutés');
};

// Exportation pour utilisation dans la console
window.historyDebug = {
  debugHistory,
  clearHistory,
  addTestEvents,
  getHistory
};