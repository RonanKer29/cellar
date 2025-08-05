import { getStatCardColorMapping } from "../../utils/wineUtils";

const StatCard = ({ title, value, subtitle, icon: Icon, color = "purple" }) => {
  const colorMapping = getStatCardColorMapping();
  const { iconColor, bgColor } = colorMapping[color] || colorMapping["purple"];

  // Définition des thèmes de couleurs améliorés
  const themes = {
    blue: {
      gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
      lightBg: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      accent: "text-blue-600"
    },
    green: {
      gradient: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      lightBg: "bg-emerald-50",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      accent: "text-emerald-600"
    },
    pink: {
      gradient: "bg-gradient-to-br from-pink-500 to-pink-600",
      lightBg: "bg-pink-50",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      accent: "text-pink-600"
    },
    purple: {
      gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
      lightBg: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      accent: "text-purple-600"
    }
  };

  const theme = themes[color] || themes.purple;

  return (
    <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-0">
      {/* Gradient de fond subtil */}
      <div className={`absolute inset-0 ${theme.lightBg} opacity-30`}></div>
      
      {/* Barre décorative en haut */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${theme.gradient}`}></div>
      
      {/* Contenu principal */}
      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between mb-4">
          {/* Icône avec nouveau design */}
          <div className={`w-14 h-14 ${theme.iconBg} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-7 h-7 ${theme.iconColor}`} />
          </div>
          
          {/* Badge ou indicateur */}
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${theme.iconBg} ${theme.iconColor}`}>
            Stats
          </div>
        </div>
        
        {/* Titre */}
        <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
          {title}
        </h3>
        
        {/* Valeur principale - mise en avant */}
        <div className="mb-3">
          <div className={`text-4xl font-black ${theme.accent} leading-none`}>
            {value}
          </div>
        </div>
        
        {/* Sous-titre avec style amélioré */}
        {subtitle && (
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${theme.gradient}`}></div>
            <p className="text-sm text-gray-600 font-medium">
              {subtitle}
            </p>
          </div>
        )}
      </div>
      
      {/* Effet de brillance au hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 transform translate-x-full group-hover:translate-x-[-100%]"></div>
    </div>
  );
};

export default StatCard;
