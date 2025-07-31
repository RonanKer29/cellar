import { Link, useLocation } from "react-router-dom";
import { Wine, BarChart3, Plus, FileText, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Définis tes routes ici
const menuItems = [
  { label: "Tableau de bord", icon: BarChart3, path: "/" },
  { label: "Ma cave", icon: Wine, path: "/ma-cave" },
  { label: "Ajouter un cru", icon: Plus, path: "/ajouter-vin" },
  { label: "Notes de dégustation", icon: FileText, path: "/notes" },
  { label: "Statistiques", icon: CheckCircle, path: "/stats" },
];

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
              {isActive && !isMobile && (
                <Badge
                  variant="secondary"
                  className="ml-auto bg-pink-100 text-pink-700 text-xs hidden lg:inline-flex"
                >
                  Active
                </Badge>
              )}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavItems;
