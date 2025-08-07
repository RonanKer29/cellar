import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Wine,
  BarChart3,
  Filter,
  Camera,
  Star,
  TrendingUp,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Users,
  Award,
  Menu,
  X,
} from "lucide-react";

/**
 * Page d'accueil (Landing Page) professionnelle pour Cave à Vin
 * Design SaaS moderne avec présentation des fonctionnalités
 * Optimisée pour mobile et l'accessibilité
 */
const Landing = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const features = [
    {
      icon: <Wine className="h-8 w-8 text-pink-600" />,
      title: "Gestion Complète",
      description:
        "Cataloguez vos vins avec toutes les informations importantes : millésime, région, cépages, notes de dégustation.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      title: "Statistiques Avancées",
      description:
        "Analysez votre collection avec des statistiques détaillées sur vos habitudes et la valeur de votre cave.",
    },
    {
      icon: <Filter className="h-8 w-8 text-pink-600" />,
      title: "Recherche Intelligente",
      description:
        "Trouvez rapidement vos vins grâce aux filtres avancés par région, couleur, prix et notes de dégustation.",
    },
    {
      icon: <Camera className="h-8 w-8 text-purple-600" />,
      title: "Photos Optimisées",
      description:
        "Ajoutez des photos de vos bouteilles avec compression automatique pour un aperçu visuel parfait.",
    },
  ];

  const benefits = [
    "Ne perdez plus jamais de vue vos meilleures bouteilles",
    "Optimisez vos achats grâce aux statistiques",
    "Partagez vos découvertes avec d'autres amateurs",
    "Suivez l'évolution de la valeur de votre collection",
  ];

  const stats = [
    { label: "Utilisateurs actifs", value: "2,500+" },
    { label: "Bouteilles cataloguées", value: "45,000+" },
    { label: "Régions couvertes", value: "120+" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo - Cliquable pour retourner à l'accueil */}
            <div className="flex items-center justify-center lg:justify-start space-x-3">
              <Link to="/" aria-label="Retourner au tableau de bord">
                <div className="inline-flex bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                  <Wine className="text-white w-8 h-8 lg:w-10 lg:h-10" />
                </div>
              </Link>
              <div className="hidden lg:block">
                <Link to="/" aria-label="Retourner au tableau de bord">
                  <h1
                    className="font-veronica text-5xl font-light
               bg-gradient-to-r from-pink-500 to-purple-600
               bg-clip-text text-transparent tracking-tight transition-all duration-200 hover:scale-105"
                  >
                    Tchin!
                  </h1>
                </Link>
              </div>
            </div>

            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:text-pink-600 focus-visible:ring-2 focus-visible:ring-pink-500"
                >
                  Connexion
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2">
                  Essayer Gratuitement
                </Button>
              </Link>
            </div>

            {/* Menu Mobile */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 focus-visible:ring-2 focus-visible:ring-pink-500"
                aria-label={
                  isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"
                }
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>

          {/* Menu Mobile Dropdown */}
          {isMobileMenuOpen && (
            <div
              id="mobile-menu"
              className="md:hidden pb-4 border-t border-pink-200/20 pt-4 animate-in slide-in-from-top-2 duration-200"
            >
              <div className="flex flex-col gap-3">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-600 hover:text-pink-600 focus-visible:ring-2 focus-visible:ring-pink-500"
                  >
                    Connexion
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2">
                    Essayer Gratuitement
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-pink-100 text-pink-700 hover:bg-pink-200 text-sm sm:text-base">
              <span role="img" aria-label="Verre de vin">
                🍷
              </span>{" "}
              La solution #1 pour les amateurs de vin
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
              Gérez votre{" "}
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                cave à vin
              </span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              comme un pro
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Cataloguez, organisez et suivez votre collection de vins avec
              intelligence. Des statistiques avancées aux notes de dégustation,
              tout ce dont vous avez besoin pour optimiser votre passion.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 max-w-md sm:max-w-none mx-auto">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-base sm:text-lg px-6 sm:px-8 py-3 focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
                >
                  Commencer Gratuitement
                  <ArrowRight
                    className="ml-2 h-4 w-4 sm:h-5 sm:w-5"
                    aria-hidden="true"
                  />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-pink-300 text-pink-700 hover:bg-pink-50 text-base sm:text-lg px-6 sm:px-8 py-3 focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
              >
                Voir la Démo
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20 px-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 sm:p-0">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white/50"
        aria-labelledby="features-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2
              id="features-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            >
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Une suite complète d'outils pour gérer votre passion du vin
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm focus-within:ring-2 focus-within:ring-pink-500 focus-within:ring-offset-2"
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="mb-4 flex justify-center" aria-hidden="true">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8"
        aria-labelledby="benefits-heading"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2
                id="benefits-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6"
              >
                Pourquoi choisir{" "}
                <span
                  className="font-veronica text-5xl font-light
               bg-gradient-to-r from-pink-500 to-purple-600
               bg-clip-text text-transparent tracking-tight"
                >
                  Tchin!
                </span>{" "}
                ?
              </h2>
              <ul className="space-y-4" role="list">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2
                      className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <p className="text-gray-700 text-sm sm:text-base">
                      {benefit}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative order-1 lg:order-2">
              <Card className="bg-gradient-to-br from-pink-100 to-purple-100 border-0 shadow-2xl">
                <CardContent className="p-6 sm:p-8">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-2 sm:p-3 rounded-full">
                        <TrendingUp
                          className="h-4 w-4 sm:h-6 sm:w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-gray-900">
                          +127%
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          Connaissance de votre collection
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-2 sm:p-3 rounded-full">
                        <Star
                          className="h-4 w-4 sm:h-6 sm:w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-gray-900">
                          4.9/5
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          Satisfaction utilisateur
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-2 sm:p-3 rounded-full">
                        <MapPin
                          className="h-4 w-4 sm:h-6 sm:w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-gray-900">
                          120+
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          Régions viticoles couvertes
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-600 to-purple-600"
        aria-labelledby="cta-heading"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            id="cta-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6"
          >
            Prêt à révolutionner votre cave ?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-pink-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Rejoignez des milliers d'amateurs de vin qui ont déjà transformé
            leur façon de gérer leur collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 max-w-md sm:max-w-none mx-auto">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-pink-600 hover:bg-pink-50 text-base sm:text-lg px-6 sm:px-8 py-3 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-pink-600"
              >
                Commencer Maintenant
                <ArrowRight
                  className="ml-2 h-4 w-4 sm:h-5 sm:w-5"
                  aria-hidden="true"
                />
              </Button>
            </Link>
          </div>
          <p className="text-pink-200 text-xs sm:text-sm mt-4 px-4">
            Aucune carte de crédit requise • Configuration en 2 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="bg-gray-900 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8"
        role="contentinfo"
      >
        <div className="max-w-7xl mx-auto text-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-3 mb-4 sm:mb-6 group focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-lg"
            aria-label="Retourner à l'accueil de Ma Cave à Vin"
          >
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-2 rounded-lg group-hover:shadow-lg transition-all duration-200">
              <Wine
                className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                aria-hidden="true"
              />
            </div>
            <span
              className="font-veronica text-5xl font-light
               bg-gradient-to-r from-pink-500 to-purple-600
               bg-clip-text text-transparent tracking-tight"
            >
              Tchin!
            </span>
          </Link>
          <p className="text-gray-400 mb-4 text-sm sm:text-base">
            La solution professionnelle pour les passionnés de vin
          </p>
          <nav
            className="flex justify-center gap-6 sm:gap-8 text-sm text-gray-400"
            aria-label="Navigation du footer"
          >
            <Link
              to="/login"
              className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded px-1"
            >
              Connexion
            </Link>
            <Link
              to="/signup"
              className="hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded px-1"
            >
              Inscription
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
