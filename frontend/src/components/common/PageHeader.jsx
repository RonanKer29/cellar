import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  showBackButton = false, 
  backTo = "/",
  className = "" 
}) => {
  const navigate = useNavigate();

  return (
    <div className={`bg-white shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        {showBackButton && (
          <button
            onClick={() => navigate(backTo)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour</span>
          </button>
        )}
        
        <div className="text-center">
          {Icon && (
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon className="w-8 h-8 text-white" />
            </div>
          )}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          {subtitle && <p className="text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;