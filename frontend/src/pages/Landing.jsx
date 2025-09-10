import React, { useState, useEffect } from "react";
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
  Sparkles,
  Shield,
  Smartphone,
  Zap,
  Globe,
  ChevronRight,
} from "lucide-react";

/**
 * Page d'accueil (Landing Page) professionnelle pour Cave à Vin
 * Design SaaS moderne avec présentation des fonctionnalités
 * Optimisée pour mobile et l'accessibilité
 */
const Landing = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // SEO: Update page title and meta description dynamically
    document.title = "CaveAVin - Gestion de Cave à Vin Digitale | Organisez votre Collection";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "CaveAVin : L'application gratuite pour gérer votre cave à vin. Cataloguez vos bouteilles, suivez vos dégustations, organisez votre collection avec photos et notes. Simple et sécurisé.");
    }
  }, []);

  const features = [
    {
      icon: <Wine className="h-8 w-8" />,
      title: "Catalogue Complet",
      description:
        "Enregistrez vos bouteilles avec nom, millésime, producteur, région, couleur et vos notes personnelles.",
      color: "from-rose-500 to-pink-600",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Statistiques Simples",
      description:
        "Visualisez votre collection : nombre de bouteilles par région, couleur, et valeur totale estimée.",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: <Filter className="h-8 w-8" />,
      title: "Recherche & Filtres",
      description:
        "Trouvez rapidement vos vins grâce aux filtres par nom, région, couleur, année ou statut.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Photos de Bouteilles",
      description:
        "Ajoutez des photos de vos bouteilles pour les reconnaître facilement dans votre cave.",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Données Sécurisées",
      description:
        "Vos données sont protégées et sauvegardées. Accès sécurisé avec authentification utilisateur.",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Interface Responsive",
      description:
        "Gérez votre cave sur ordinateur, tablette et mobile avec une interface adaptée à chaque écran.",
      color: "from-cyan-500 to-blue-600",
    },
  ];

  const benefits = [
    "Cataloguez facilement toute votre collection de vins",
    "Retrouvez rapidement vos bouteilles grâce aux filtres",
    "Gardez vos notes de dégustation et photos organisées",
    "Suivez quelles bouteilles vous avez déjà consommées",
    "Interface simple et intuitive sur tous vos appareils",
    "Données sécurisées et sauvegardées automatiquement",
  ];

  const stats = [
    {
      label: "Projet Open Source",
      value: "100%",
      description: "Code disponible et transparence totale",
    },
    {
      label: "Gratuit",
      value: "∞",
      description: "Toutes les fonctionnalités sans limite",
    },
    {
      label: "Simplicité",
      value: "★★★★★",
      description: "Interface intuitive et facile à utiliser",
    },
  ];

  const testimonials = [
    {
      name: "Jean-Michel",
      role: "Collectionneur amateur",
      image: "🍷",
      content:
        "Interface simple et claire, parfait pour cataloguer ma petite collection de 50 bouteilles. J'aime pouvoir ajouter mes notes de dégustation.",
      rating: 5,
    },
    {
      name: "Claire",
      role: "Passionnée de vin",
      image: "🍇",
      content:
        "Très pratique pour ne pas oublier ce que j'ai dans ma cave. Les photos m'aident à retrouver mes bouteilles facilement.",
      rating: 4,
    },
    {
      name: "David",
      role: "Amateur débutant",
      image: "🥂",
      content:
        "Application gratuite et facile à utiliser. Idéale pour débuter et apprendre à organiser sa collection de vins.",
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: "Gratuit",
      price: "0€",
      period: "",
      description: "Idéal pour débuter",
      features: [
        "Collection illimitée de bouteilles",
        "Photos et notes personnelles",
        "Recherche et filtres",
        "Statistiques de base",
        "Interface responsive",
        "Données sécurisées",
      ],
      cta: "Commencer gratuitement",
      popular: true,
    },
    {
      name: "Premium",
      price: "À venir",
      period: "",
      description: "Fonctionnalités avancées (bientôt)",
      features: [
        "Tout du plan Gratuit",
        "Export de données",
        "Sauvegarde cloud avancée",
        "Support prioritaire",
        "Fonctionnalités collaboratives",
        "API d'accès",
      ],
      cta: "Bientôt disponible",
      popular: false,
    },
    {
      name: "Professionnel",
      price: "Sur devis",
      period: "",
      description: "Pour cavistes et professionnels",
      features: [
        "Solution sur-mesure",
        "Gestion multi-utilisateurs",
        "Intégration systèmes",
        "Formation personnalisée",
        "Support dédié",
        "SLA garanti",
      ],
      cta: "Nous contacter",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-rose-50/40">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-purple-200/20 via-transparent to-transparent animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-rose-200/20 via-transparent to-transparent animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/70 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
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
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Badge className="mb-8 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 hover:from-purple-200 hover:to-pink-200 text-sm sm:text-base border-0 px-4 py-2 shadow-lg">
              <Sparkles className="mr-2 h-4 w-4" />
              Application gratuite de gestion de cave à vin
            </Badge>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
              Votre cave digitale
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                  organisée
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-full"></div>
              </span>
            </h1>

            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Cataloguez et organisez votre collection de vins.
              <br className="hidden sm:block" />
              <span className="text-gray-800 font-medium">
                Simple, gratuit, et accessible partout.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 max-w-lg mx-auto sm:max-w-none">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-10 py-4 rounded-xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-200 border-0"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Démarrer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
              >
                <span role="img" aria-label="Play" className="mr-2">
                  ▶️
                </span>
                Voir la démo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-16 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>100% gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <span>Données sécurisées</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                <span>Open Source</span>
              </div>
            </div>
          </div>

          {/* Enhanced Stats */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 relative"
        aria-labelledby="features-heading"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border-0 px-4 py-2 shadow-sm">
              <Globe className="mr-2 h-4 w-4" />
              Fonctionnalités avancées
            </Badge>
            <h2
              id="features-heading"
              className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            >
              Une plateforme
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                complète
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              Découvrez tous les outils dont vous avez besoin pour transformer
              votre cave en véritable patrimoine digital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden hover:scale-105"
              >
                <CardContent className="p-8 text-center relative">
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  ></div>

                  {/* Icon with gradient background */}
                  <div
                    className={`mb-6 mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    {React.cloneElement(feature.icon, {
                      className: "h-8 w-8 text-white",
                    })}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Learn More Button */}
                  <div className="flex items-center justify-center text-sm font-medium text-gray-500 group-hover:text-purple-600 transition-colors cursor-pointer">
                    En savoir plus
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-0 px-4 py-2 shadow-sm">
              <Users className="mr-2 h-4 w-4" />
              Témoignages clients
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6">
              Ils nous font
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {" "}
                confiance
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Découvrez comment Tchin transforme la passion de nos utilisateurs
              en expertise professionnelle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white rounded-3xl overflow-hidden relative"
              >
                {/* Gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500"></div>

                <CardContent className="p-8">
                  {/* Quote icon */}
                  <div className="mb-6 flex justify-between items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">"</span>
                    </div>
                    {/* Stars */}
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-700 mb-8 leading-relaxed text-base font-medium">
                    {testimonial.content}
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg mr-4 shadow-lg">
                      {testimonial.image}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border-0 px-4 py-2 shadow-sm">
              <Award className="mr-2 h-4 w-4" />
              Plans & Tarifs
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6">
              Choisissez votre
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                formule
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Des plans adaptés à tous les profils, du débutant au professionnel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className="relative">
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10 mt-1">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 border-0 px-3 py-1 shadow-lg font-semibold text-xs">
                      <Sparkles className="mr-1 h-3 w-3" />
                      POPULAIRE
                    </Badge>
                  </div>
                )}

                <Card
                  className={`border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden ${
                    plan.popular
                      ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white transform scale-105"
                      : "bg-white hover:scale-105"
                  }`}
                >
                  <CardContent className="p-8 text-center">
                    <h3
                      className={`text-2xl font-bold mb-2 ${
                        plan.popular ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`mb-6 ${
                        plan.popular ? "text-purple-100" : "text-gray-600"
                      }`}
                    >
                      {plan.description}
                    </p>

                    <div className="mb-8">
                      <span
                        className={`text-5xl font-bold ${
                          plan.popular ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span
                        className={`${
                          plan.popular ? "text-purple-100" : "text-gray-600"
                        }`}
                      >
                        {plan.period}
                      </span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <CheckCircle2
                            className={`h-5 w-5 mr-3 flex-shrink-0 ${
                              plan.popular ? "text-green-300" : "text-green-500"
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              plan.popular ? "text-purple-50" : "text-gray-700"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link to="/signup" className="block">
                      <Button
                        className={`w-full py-4 px-6 rounded-xl font-bold text-base transition-all duration-200 transform hover:scale-[1.02] ${
                          plan.popular
                            ? "bg-white text-purple-600 hover:bg-gray-50 shadow-xl hover:shadow-2xl"
                            : plan.name === "Premium"
                            ? "bg-gray-100 text-gray-500 cursor-not-allowed shadow-md"
                            : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl"
                        }`}
                        disabled={plan.name === "Premium"}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Application entièrement gratuite et open source
            </p>
            <div className="flex justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Données sécurisées</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                <span>Sans publicité</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span>Code ouvert</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 relative overflow-hidden"
        aria-labelledby="cta-heading"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-pink-400/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial from-purple-400/20 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative">
          <Badge className="mb-8 bg-white/20 text-white border-0 px-4 py-2 shadow-lg backdrop-blur-sm">
            <Sparkles className="mr-2 h-4 w-4" />
            Offre limitée
          </Badge>

          <h2
            id="cta-heading"
            className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Transformez votre passion
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              dès aujourd'hui
            </span>
          </h2>

          <p className="text-xl lg:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
            Rejoignez les amateurs de vin qui organisent déjà leur collection
            avec <strong className="text-white">Tchin</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 max-w-lg mx-auto sm:max-w-none">
            <Link to="/signup" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-purple-600 hover:bg-gray-50 text-lg px-10 py-4 rounded-xl shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-200 font-semibold border-0"
              >
                <Zap className="mr-2 h-5 w-5" />
                Démarrer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              className="w-full sm:w-auto bg-transparent border-2 border-white/50 text-white hover:bg-white/15 hover:border-white/70 text-lg px-10 py-4 rounded-xl backdrop-blur-sm transition-all duration-200 font-semibold shadow-lg hover:shadow-white/10 transform hover:scale-105"
            >
              Planifier une démo
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-purple-100 text-sm max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <CheckCircle2 className="h-5 w-5 text-green-400 mb-1" />
              <span>100% gratuit</span>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-5 w-5 text-blue-400 mb-1" />
              <span>Données sécurisées</span>
            </div>
            <div className="flex flex-col items-center">
              <Sparkles className="h-5 w-5 text-pink-400 mb-1" />
              <span>Open Source</span>
            </div>
            <div className="flex flex-col items-center">
              <Smartphone className="h-5 w-5 text-yellow-400 mb-1" />
              <span>Multi-plateformes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8"
        role="contentinfo"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link
                to="/"
                className="inline-flex items-center gap-3 mb-6 group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded-lg"
                aria-label="Retourner à l'accueil"
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl group-hover:shadow-lg transition-all duration-200">
                  <Wine className="h-6 w-6 text-white" />
                </div>
                <span className="font-veronica text-4xl font-light bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
                  Tchin!
                </span>
              </Link>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                La plateforme de référence pour les collectionneurs de vin.
                Gérez, analysez et valorisez votre cave avec intelligence
                artificielle.
              </p>
              <div className="flex gap-4 text-gray-400">
                <Badge className="bg-green-900/50 text-green-400 border-0">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Service disponible
                </Badge>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-semibold text-white mb-4">Produit</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <Link
                    to="/signup"
                    className="hover:text-white transition-colors"
                  >
                    Fonctionnalités
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="hover:text-white transition-colors"
                  >
                    Tarifs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="hover:text-white transition-colors"
                  >
                    API
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="hover:text-white transition-colors"
                  >
                    Intégrations
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="hover:text-white transition-colors"
                  >
                    Sécurité
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-white mb-4">Entreprise</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <Link
                    to="/signup"
                    className="hover:text-white transition-colors"
                  >
                    À propos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="hover:text-white transition-colors"
                  >
                    Carrières
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="hover:text-white transition-colors"
                  >
                    Presse
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400">
                <span>© 2025 Tchin. Tous droits réservés.</span>
                <div className="flex gap-4">
                  <Link
                    to="/signup"
                    className="hover:text-white transition-colors"
                  >
                    Politique de confidentialité
                  </Link>
                  <Link
                    to="/signup"
                    className="hover:text-white transition-colors"
                  >
                    CGU
                  </Link>
                  <Link
                    to="/signup"
                    className="hover:text-white transition-colors"
                  >
                    Cookies
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                  <span>Projet Open Source</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
