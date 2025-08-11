/**
 * Utilitaires de debug pour tester l'expiration de session
 * 
 * Ces fonctions sont destinées au développement pour tester
 * le système d'expiration de session sans attendre 2 jours.
 */

/**
 * Simule une session expirée en définissant une date de connexion ancienne
 * 
 * @param {number} daysAgo - Nombre de jours dans le passé (défaut: 3)
 */
export const simulateExpiredSession = (daysAgo = 3) => {
  const pastTime = new Date().getTime() - (daysAgo * 24 * 60 * 60 * 1000);
  localStorage.setItem('loginTime', pastTime.toString());
  console.log(`Session simulée comme expirée depuis ${daysAgo} jours`);
};

/**
 * Affiche les informations de session actuelles
 */
export const getSessionInfo = () => {
  const loginTime = localStorage.getItem('loginTime');
  const accessToken = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');
  
  if (!loginTime) {
    console.log('Aucune session active');
    return;
  }
  
  const loginDate = new Date(parseInt(loginTime));
  const currentTime = new Date();
  const sessionAge = Math.floor((currentTime - loginDate) / (1000 * 60 * 60)); // en heures
  
  console.log({
    loginDate: loginDate.toLocaleString(),
    sessionAgeHours: sessionAge,
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
    willExpireIn: `${48 - sessionAge} heures`
  });
};

/**
 * Remet la session à l'état actuel (comme une nouvelle connexion)
 */
export const resetSessionTimer = () => {
  localStorage.setItem('loginTime', new Date().getTime().toString());
  console.log('Timer de session réinitialisé');
};

// Export pour utilisation dans la console du navigateur en développement
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  window.sessionDebug = {
    simulateExpiredSession,
    getSessionInfo,
    resetSessionTimer
  };
}