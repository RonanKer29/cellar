// Utility functions for SEO optimization

/**
 * Updates the page title dynamically
 * @param {string} title - The page title
 * @param {string} suffix - Optional suffix (default: site name)
 */
export const updateTitle = (title, suffix = "CaveAVin") => {
  document.title = suffix ? `${title} | ${suffix}` : title;
};

/**
 * Updates meta description
 * @param {string} description - The meta description content
 */
export const updateMetaDescription = (description) => {
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", description);
  }
};

/**
 * Updates Open Graph meta tags
 * @param {Object} ogData - Object containing og properties
 */
export const updateOpenGraph = (ogData) => {
  const {
    title,
    description,
    image,
    url,
    type = "website"
  } = ogData;

  // Update OG title
  if (title) {
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);
  }

  // Update OG description
  if (description) {
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", description);
  }

  // Update OG image
  if (image) {
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute("content", image);
  }

  // Update OG URL
  if (url) {
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", url);
  }

  // Update OG type
  const ogType = document.querySelector('meta[property="og:type"]');
  if (ogType) ogType.setAttribute("content", type);
};

/**
 * Updates canonical URL
 * @param {string} url - The canonical URL
 */
export const updateCanonical = (url) => {
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute("href", url);
  }
};

/**
 * Adds structured data (JSON-LD) to the page
 * @param {Object} data - The structured data object
 */
export const addStructuredData = (data) => {
  // Remove existing structured data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    existingScript.remove();
  }

  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

/**
 * SEO configuration for different pages
 */
export const seoConfig = {
  home: {
    title: "CaveAVin - Gestion de Cave à Vin Digitale",
    description: "L'application gratuite pour gérer votre cave à vin. Cataloguez vos bouteilles, suivez vos dégustations, organisez votre collection avec photos et notes.",
    keywords: "cave à vin, gestion vin, collection vin, dégustation, millésime, caviste"
  },
  login: {
    title: "Connexion - CaveAVin",
    description: "Connectez-vous à votre compte CaveAVin pour accéder à votre cave à vin digitale et gérer votre collection de vins.",
    keywords: "connexion, login, compte, cave à vin"
  },
  signup: {
    title: "Inscription Gratuite - CaveAVin",
    description: "Créez votre compte gratuit CaveAVin et commencez à organiser votre collection de vins dès maintenant. Simple, rapide et sécurisé.",
    keywords: "inscription, compte gratuit, création compte, cave à vin"
  },
  dashboard: {
    title: "Tableau de Bord - CaveAVin",
    description: "Accédez à votre tableau de bord CaveAVin pour une vue d'ensemble de votre collection de vins et statistiques.",
    keywords: "tableau de bord, dashboard, statistiques vin, collection"
  },
  maCave: {
    title: "Ma Cave - CaveAVin",
    description: "Explorez et gérez toutes vos bouteilles de vin dans votre cave digitale CaveAVin.",
    keywords: "ma cave, bouteilles, collection vin, gestion cave"
  }
};