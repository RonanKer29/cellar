// Génère un avatar basé sur les initiales et une couleur
export const generateAvatar = (name, size = 64) => {
  if (!name) return null;
  
  // Générer les initiales
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  // Générer une couleur basée sur le nom
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Palette de couleurs cohérente avec le thème de l'app
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #e0c3fc 0%, #9bb5ff 100%)',
  ];
  
  const colorIndex = Math.abs(hash) % colors.length;
  const backgroundColor = colors[colorIndex];
  
  // Créer un canvas pour générer l'avatar
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  // Créer un gradient
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  // Parse le gradient CSS pour extraire les couleurs
  const gradientMatch = backgroundColor.match(/#[a-fA-F0-9]{6}/g);
  if (gradientMatch && gradientMatch.length >= 2) {
    gradient.addColorStop(0, gradientMatch[0]);
    gradient.addColorStop(1, gradientMatch[1]);
  } else {
    // Fallback
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
  }
  
  // Dessiner le fond
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  // Dessiner les initiales
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${size * 0.4}px Inter, -apple-system, BlinkMacSystemFont, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(initials, size / 2, size / 2);
  
  return canvas.toDataURL();
};

// Couleurs d'avatar prédéfinies
export const getAvatarColors = () => [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #9bb5ff 100%)',
];