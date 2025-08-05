import { Wine } from "lucide-react";

const Intro = () => {
  return (
    <div className="mb-8">
      <div className="relative bg-white rounded-xl border border-gray-200/60 p-8 sm:p-10 shadow-sm">
        {/* Motif subtil en arrière-plan */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 to-transparent rounded-xl"></div>
        
        {/* Contenu principal */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="flex-1 mb-6 sm:mb-0">
            {/* Titre principal élégant */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 leading-tight">
              Tableau de bord
              <span className="block text-2xl sm:text-3xl font-medium text-gray-600">
                de ma cave à vin
              </span>
            </h1>
            
            {/* Sous-titre raffiné */}
            <p className="text-lg text-gray-500 font-normal max-w-2xl leading-relaxed">
              Gérez et suivez votre collection de bouteilles
            </p>
          </div>
          
          {/* Icône minimaliste */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-xl flex items-center justify-center">
              <Wine className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
