/**
 * @fileoverview Composant de navigation principale de l'application Cave à Vin
 * Affiche les éléments de menu avec état actif et adaptation mobile/desktop
 */

import { Link, useLocation } from "react-router-dom";
import { Wine, BarChart3, Plus, FileText, CheckCircle, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * Configuration des éléments de menu de l'application
 * Chaque élément contient un libellé, une icône et un chemin de navigation
 */
const menuItems = [
  { label: "Tableau de bord", icon: BarChart3, path: "/dashboard" },
  { label: "Ma cave", icon: Wine, path: "/ma-cave" },
  { label: "Historique", icon: History, path: "/historique" },
  { label: "Ajouter un cru", icon: Plus, path: "/ajouter-vin" },
  { label: "Statistiques", icon: CheckCircle, path: "/stats" },
];

/**
 * Composant de navigation responsive avec éléments de menu interactifs
 * S'adapte automatiquement aux interfaces mobile et desktop
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {boolean} [props.isMobile=false] - Mode d'affichage mobile avec espacement adapté
 * @param {Function} [props.onClick] - Fonction callback lors du clic sur un élément (utile pour fermer les menus mobiles)
 * 
 * @example
 * // Navigation desktop
 * <NavItems />
 * 
 * @example
 * // Navigation mobile avec callback de fermeture
 * <NavItems 
 *   isMobile={true}
 *   onClick={() => setMobileMenuOpen(false)}
 * />
 * 
 * @returns {JSX.Element} Navigation avec éléments de menu stylisés et état actif
 */
const NavItems = ({ isMobile = false, onClick }) => {
  const location = useLocation();

  return (
    <nav
      className={`flex ${
        isMobile ? "flex-col space-y-4" : "flex-col space-y-3"
      } mt-6`}
    >
      {menuItems.map((item, idx) => {
        // Si l’URL correspond au path, on l’active
        const isActive = location.pathname === item.path;

        return (
          <Link to={item.path} key={idx} onClick={onClick} className="w-full">
            <Button
              variant={isActive ? "default" : "ghost"}
              className={`
                ${
                  isMobile
                    ? "justify-start h-12 text-base"
                    : "justify-start text-sm lg:text-base h-10 lg:h-12"
                }
                ${
                  isActive
                    ? "bg-pink-600 hover:bg-pink-700 text-white"
                    : "text-gray-600 hover:text-pink-600 hover:bg-pink-50"
                }
                w-full text-left transition-all duration-200
              `}
            >
              <item.icon
                className={`${
                  isMobile ? "mr-3 h-5 w-5" : "mr-2 h-4 w-4 lg:h-5 lg:w-5"
                }`}
              />
              <span className={isMobile ? "block" : "hidden sm:block"}>
                {item.label}
              </span>
            </Button>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavItems;
