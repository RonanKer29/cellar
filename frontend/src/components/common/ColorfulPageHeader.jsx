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

  // Définition des thèmes de couleurs
  const themes = {
    blue: {
      gradient: "bg-gradient-to-br from-blue-50 to-sky-100",
      border: "border-blue-200/50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      titleColor: "text-gray-900",
      subtitleColor: "text-blue-700/80"
    },
    green: {
      gradient: "bg-gradient-to-br from-emerald-50 to-teal-100",
      border: "border-emerald-200/50",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      titleColor: "text-gray-900",
      subtitleColor: "text-emerald-700/80"
    },
    purple: {
      gradient: "bg-gradient-to-br from-purple-50 to-violet-100",
      border: "border-purple-200/50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      titleColor: "text-gray-900",
      subtitleColor: "text-purple-700/80"
    },
    indigo: {
      gradient: "bg-gradient-to-br from-indigo-50 to-blue-100",
      border: "border-indigo-200/50",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      titleColor: "text-gray-900",
      subtitleColor: "text-indigo-700/80"
    }
  };

  const currentTheme = themes[theme] || themes.blue;

  return (
    <div className={`relative overflow-hidden rounded-xl border ${currentTheme.border} ${currentTheme.gradient} shadow-sm mb-6`}>
      {/* Motifs décoratifs subtils */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/20 rounded-full translate-y-12 -translate-x-12 blur-xl"></div>
      
      <div className="relative z-10 p-6 sm:p-8">
        {showBackButton && (
          <button
            onClick={() => navigate(backTo)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour</span>
          </button>
        )}
        
        {/* Contenu principal */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            {Icon && (
              <div className={`w-14 h-14 sm:w-16 sm:h-16 ${currentTheme.iconBg} rounded-xl flex items-center justify-center`}>
                <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${currentTheme.iconColor}`} />
              </div>
            )}
            <div>
              <h1 className={`text-2xl sm:text-3xl font-bold ${currentTheme.titleColor} leading-tight`}>
                {title}
              </h1>
              {subtitle && (
                <p className={`text-base sm:text-lg ${currentTheme.subtitleColor} font-medium mt-1`}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          
          {actions && (
            <div className="flex items-center space-x-3">
              {actions}
            </div>
          )}
        </div>
        
        {bottomContent && (
          <div className="mt-6 pt-6 border-t border-white/30">
            {bottomContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorfulPageHeader;