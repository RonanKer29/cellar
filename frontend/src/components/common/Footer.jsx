/**
 * @fileoverview Footer professionnel et élégant pour l'application Cave à Vin
 * Composant footer responsive avec liens utiles, informations légales et SEO
 */

import {
  Wine,
  Heart,
  Mail,
  MapPin,
  Phone,
  Shield,
  FileText,
  Users,
  Github,
  Twitter,
  Instagram,
} from "lucide-react";

/**
 * Footer principal de l'application
 * Design moderne avec sections organisées et optimisation SEO
 *
 * @returns {JSX.Element} Footer responsive et élégant
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-100 via-slate-50 to-gray-100 text-gray-800 border-t border-gray-200">
      {/* Section principale du footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl">
                <Wine className="w-6 h-6 text-white" />
              </div>
              <h3
                className="font-veronica text-3xl font-light
               bg-gradient-to-r from-pink-500 to-purple-600
               bg-clip-text text-transparent tracking-tight"
              >
                Tchin!
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Gérez votre collection de vins avec élégance. Suivez vos
              dégustations, organisez votre cave et découvrez de nouveaux
              trésors œnologiques.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="text-gray-500 hover:text-purple-600 transition-colors"
                aria-label="Suivez-nous sur Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-purple-600 transition-colors"
                aria-label="Rejoignez-nous sur Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-purple-600 transition-colors"
                aria-label="Code source sur GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation rapide */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/dashboard"
                  className="text-gray-600 hover:text-purple-600 transition-colors text-sm flex items-center space-x-2"
                >
                  <span>Tableau de bord</span>
                </a>
              </li>
              <li>
                <a
                  href="/ma-cave"
                  className="text-gray-600 hover:text-purple-600 transition-colors text-sm flex items-center space-x-2"
                >
                  <span>Ma Cave</span>
                </a>
              </li>
              <li>
                <a
                  href="/ajouter-vin"
                  className="text-gray-600 hover:text-purple-600 transition-colors text-sm flex items-center space-x-2"
                >
                  <span>Ajouter un vin</span>
                </a>
              </li>
              <li>
                <a
                  href="/stats"
                  className="text-gray-600 hover:text-purple-600 transition-colors text-sm flex items-center space-x-2"
                >
                  <span>Statistiques</span>
                </a>
              </li>
              <li>
                <a
                  href="/historique"
                  className="text-gray-600 hover:text-purple-600 transition-colors text-sm flex items-center space-x-2"
                >
                  <span>Historique</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Ressources et aide */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Ressources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/aide"
                  className="text-gray-600 hover:text-purple-600 transition-colors text-sm flex items-center space-x-2"
                >
                  <Users className="w-4 h-4" />
                  <span>Centre d'aide</span>
                </a>
              </li>
              <li>
                <a
                  href="/guide"
                  className="text-gray-600 hover:text-purple-600 transition-colors text-sm flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Guide d'utilisation</span>
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-gray-600 hover:text-purple-600 transition-colors text-sm flex items-center space-x-2"
                >
                  <Wine className="w-4 h-4" />
                  <span>Blog œnologie</span>
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-600 hover:text-purple-600 transition-colors text-sm flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact et légal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-600 text-sm">
                <Mail className="w-4 h-4 text-purple-600" />
                <a
                  href="mailto:contact@macave.fr"
                  className="hover:text-purple-600 transition-colors"
                >
                  ...
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 text-sm">
                <Phone className="w-4 h-4 text-purple-600" />
                <span>...</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 text-sm">
                <MapPin className="w-4 h-4 text-purple-600" />
                <span>Switzerland</span>
              </div>
            </div>

            {/* Liens légaux */}
            <div className="pt-4 border-t border-gray-300">
              <ul className="space-y-2">
                <li>
                  <a
                    href="/mentions-legales"
                    className="text-gray-600 hover:text-purple-600 transition-colors text-sm flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Mentions légales</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/confidentialite"
                    className="text-gray-600 hover:text-purple-600 transition-colors text-sm flex items-center space-x-2"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Confidentialité</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de copyright */}
      <div className="border-t border-gray-300 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-gray-600 text-sm">
              © {currentYear} Tchin! Tous droits réservés.
            </div>
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <span>Fait avec</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span>pour les amateurs de vin</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
