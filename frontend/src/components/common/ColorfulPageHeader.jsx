import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * En-tête de page coloré et subtil avec différents thèmes
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {string} props.title - Titre principal de la page
 * @param {string} [props.subtitle] - Sous-titre ou description de la page
 * @param {React.Component} [props.icon] - Composant d'icône Lucide React à afficher
 * @param {string} [props.theme="blue"] - Thème de couleur ("blue", "green", "purple", "indigo")
 * @param {boolean} [props.showBackButton=false] - Afficher le bouton de retour
 * @param {string} [props.backTo="/"] - URL de destination du bouton de retour
 * @param {React.ReactNode} [props.actions] - Actions personnalisées à droite
 * @param {React.ReactNode} [props.bottomContent] - Contenu additionnel en bas
 * 
 * @returns {JSX.Element} En-tête coloré avec gradient subtil
 */
const ColorfulPageHeader = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  theme = "blue",
  showBackButton = false, 
  backTo = "/",
  actions,
  bottomContent
}) => {
  const navigate = useNavigate();

  // Définition des thèmes de couleurs UX-friendly
  const themes = {
    blue: {
      gradient: "bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50",
      iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
      iconColor: "text-white",
      titleColor: "text-gray-900",
      subtitleColor: "text-gray-600",
      accent: "bg-blue-100"
    },
    green: {
      gradient: "bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50",
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
      iconColor: "text-white",
      titleColor: "text-gray-900",
      subtitleColor: "text-gray-600",
      accent: "bg-emerald-100"
    },
    purple: {
      gradient: "bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50",
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-600",
      iconColor: "text-white",
      titleColor: "text-gray-900",
      subtitleColor: "text-gray-600",
      accent: "bg-purple-100"
    },
    indigo: {
      gradient: "bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50",
      iconBg: "bg-gradient-to-br from-indigo-500 to-blue-600",
      iconColor: "text-white",
      titleColor: "text-gray-900",
      subtitleColor: "text-gray-600",
      accent: "bg-indigo-100"
    }
  };

  const currentTheme = themes[theme] || themes.blue;

  return (
    <div className={`${currentTheme.gradient} border-b border-gray-200/50 mb-6`}>
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-purple-100/20 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
      
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
        {showBackButton && (
          <button
            onClick={() => navigate(backTo)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-all duration-300 mb-4 group"
          >
            <div className="p-1.5 rounded-lg bg-white/80 hover:bg-white shadow-sm border border-gray-200 group-hover:border-gray-300 transition-all duration-300">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">Retour</span>
          </button>
        )}
        
        {/* Contenu principal */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            {Icon && (
              <div className="relative flex-shrink-0">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 ${currentTheme.iconBg} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${currentTheme.iconColor}`} />
                </div>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${currentTheme.titleColor} leading-tight tracking-tight`}>
                {title}
              </h1>
              {subtitle && (
                <p className={`text-sm sm:text-base ${currentTheme.subtitleColor} font-medium mt-1 max-w-2xl`}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          
          {actions && (
            <div className="flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>
        
        {bottomContent && (
          <div className="mt-4 pt-4 border-t border-gray-200/60">
            <div className="[&_.badge]:text-xs [&_.badge]:px-2 [&_.badge]:py-1">
              {bottomContent}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorfulPageHeader;