/**
 * Utilitaires pour la gestion des images
 */

/**
 * Compresse une image côté client avant upload
 * @param {File} file - Fichier image à compresser
 * @param {number} maxWidth - Largeur maximale
 * @param {number} maxHeight - Hauteur maximale  
 * @param {number} quality - Qualité (0-1)
 * @returns {Promise<File>} - Image compressée
 */
export const compressImage = (file, maxWidth = 800, maxHeight = 600, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculer les nouvelles dimensions
      let { width, height } = img;
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      
      if (ratio < 1) {
        width *= ratio;
        height *= ratio;
      }
      
      // Redimensionner sur le canvas
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convertir en blob puis en file
      canvas.toBlob((blob) => {
        const compressedFile = new File([blob], file.name, {
          type: 'image/jpeg',
          lastModified: Date.now()
        });
        resolve(compressedFile);
      }, 'image/jpeg', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Vérifie si un fichier est une image valide
 * @param {File} file - Fichier à vérifier
 * @returns {boolean} - True si c'est une image
 */
export const isValidImage = (file) => {
  return file && file.type.startsWith('image/');
};

/**
 * Formate la taille d'un fichier en MB
 * @param {number} bytes - Taille en bytes
 * @returns {string} - Taille formatée
 */
export const formatFileSize = (bytes) => {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)} MB`;
};