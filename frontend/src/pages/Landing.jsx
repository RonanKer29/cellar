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
  }, []);

  const features = [
    {
      icon: <Wine className="h-8 w-8" />,
      title: "Gestion Intelligente",
      description:
        "Cataloguez vos vins avec toutes les informations importantes : millésime, région, cépages, notes de dégustation détaillées.",
      color: "from-rose-500 to-pink-600"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics Avancés",
      description:
        "Tableaux de bord interactifs, tendances de consommation, ROI de votre collection et insights personnalisés.",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: <Filter className="h-8 w-8" />,
      title: "Recherche IA",
      description:
        "Recherche sémantique intelligente, filtres multiples, recommandations personnalisées basées sur vos goûts.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Scan & Photo",
      description:
        "Reconnaissance automatique d'étiquettes, compression d'images optimisée, galerie organisée par collection.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Sécurité Premium",
      description:
        "Chiffrement de bout en bout, sauvegardes automatiques, authentification à deux facteurs incluse.",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Multi-Plateformes",
      description:
        "Applications mobiles natives, synchronisation cloud instantanée, mode hors ligne disponible.",
      color: "from-cyan-500 to-blue-600"
    },
  ];

  const benefits = [
    "Ne perdez plus jamais de vue vos meilleures bouteilles",
    "Optimisez vos achats grâce aux analytics prédictifs",
    "Partagez vos découvertes avec une communauté d'experts",
    "Suivez l'évolution de la valeur de votre patrimoine viticole",
    "Recevez des alertes pour les moments de dégustation optimaux",
    "Gérez plusieurs caves et emplacements de stockage",
  ];

  const stats = [
    { 
      label: "Utilisateurs actifs", 
      value: "12,500+",
      description: "Collectionneurs font confiance à Tchin"
    },
    { 
      label: "Bouteilles cataloguées", 
      value: "180,000+",
      description: "Bouteilles gérées sur la plateforme"
    },
    { 
      label: "Régions viticoles", 
      value: "250+",
      description: "Appellations et domaines référencés"
    },
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Sommelière & Collectionneuse",
      image: "👩‍🍳",
      content: "Tchin a révolutionné ma façon de gérer ma cave. L'interface est intuitive et les analytics m'aident à optimiser mes achats.",
      rating: 5
    },
    {
      name: "Pierre Martin",
      role: "Amateur passionné",
      image: "👨‍💼", 
      content: "Depuis que j'utilise Tchin, j'ai découvert des pépites dans ma collection que j'avais oubliées. Un outil indispensable !",
      rating: 5
    },
    {
      name: "Sophie Chen",
      role: "Investisseur vin",
      image: "👩‍💻",
      content: "Le suivi de valorisation est précis et les prédictions m'ont fait gagner 15% sur mes investissements cette année.",
      rating: 5
    },
  ];

  const pricingPlans = [
    {
      name: "Découverte",
      price: "Gratuit",
      period: "",
      description: "Parfait pour commencer",
      features: [
        "Jusqu'à 50 bouteilles",
        "Photos et notes de base",
        "Recherche simple",
        "Support communautaire"
      ],
      cta: "Commencer gratuitement",
      popular: false
    },
    {
      name: "Collectionneur",
      price: "9€",
      period: "/mois",
      description: "Pour les passionnés",
      features: [
        "Bouteilles illimitées",
        "Analytics avancés",
        "Multi-caves",
        "Export PDF",
        "Support prioritaire",
        "API d'intégration"
      ],
      cta: "Essai gratuit 14 jours",
      popular: true
    },
    {
      name: "Professionnel",
      price: "29€",
      period: "/mois",
      description: "Pour les professionnels",
      features: [
        "Tout du plan Collectionneur",
        "Gestion d'équipe",
        "Rapports personnalisés",
        "Intégrations avancées",
        "Support dédié",
        "SLA 99.9%"
      ],
      cta: "Contacter les ventes",
      popular: false
    }
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
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce delay-300"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-gradient-to-r from-rose-400 to-orange-400 rounded-full animate-bounce delay-700"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-bounce delay-1000"></div>
          </div>

          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Badge className="mb-8 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 hover:from-purple-200 hover:to-pink-200 text-sm sm:text-base border-0 px-4 py-2 shadow-lg">
              <Sparkles className="mr-2 h-4 w-4" />
              Plateforme #1 pour collectionneurs de vin
            </Badge>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
              Votre cave digitale
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent animate-pulse">
                  intelligente
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-full"></div>
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Transformez votre passion en expertise grâce à l'IA.
              <br className="hidden sm:block" />
              <span className="text-gray-800 font-medium">Analytics, prédictions, recommandations.</span>
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
                className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <span role="img" aria-label="Play" className="mr-2">▶️</span>
                Voir la démo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-16 text-gray-500 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Gratuit pendant 14 jours</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <span>Données sécurisées</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span>4.9/5 sur 1200+ avis</span>
              </div>
            </div>
          </div>

          {/* Enhanced Stats */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
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
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> complète</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              Découvrez tous les outils dont vous avez besoin pour transformer votre cave en véritable patrimoine digital
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
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Icon with gradient background */}
                  <div className={`mb-6 mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    {React.cloneElement(feature.icon, { className: "h-8 w-8 text-white" })}
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
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> confiance</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Découvrez comment Tchin transforme la passion de nos utilisateurs en expertise professionnelle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-2xl">
                <CardContent className="p-8">
                  {/* Stars */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </blockquote>
                  
                  {/* Author */}
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">{testimonial.image}</div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
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
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> formule</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Des plans adaptés à tous les profils, du débutant au professionnel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white transform scale-105' 
                    : 'bg-white hover:scale-105'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-yellow-400 text-yellow-900 border-0 px-4 py-1 shadow-lg">
                      <Sparkles className="mr-1 h-3 w-3" />
                      Populaire
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-8 text-center">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`mb-6 ${plan.popular ? 'text-purple-100' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                  
                  <div className="mb-8">
                    <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                      {plan.price}
                    </span>
                    <span className={`${plan.popular ? 'text-purple-100' : 'text-gray-600'}`}>
                      {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle2 
                          className={`h-5 w-5 mr-3 flex-shrink-0 ${
                            plan.popular ? 'text-green-300' : 'text-green-500'
                          }`} 
                        />
                        <span className={`text-sm ${plan.popular ? 'text-purple-50' : 'text-gray-700'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/signup" className="block">
                    <Button 
                      className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                        plan.popular 
                          ? 'bg-white text-purple-600 hover:bg-gray-50 shadow-lg hover:shadow-xl' 
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Toutes les formules incluent une garantie satisfait ou remboursé de 30 jours
            </p>
            <div className="flex justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Sécurisé SSL</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                <span>Support 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>99.9% uptime</span>
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
            Rejoignez plus de <strong className="text-white">12,500 collectionneurs</strong> qui utilisent déjà Tchin 
            pour maximiser la valeur de leur cave
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
              variant="outline"
              className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 text-lg px-10 py-4 rounded-xl backdrop-blur-sm transition-all duration-200"
            >
              Planifier une démo
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-purple-100 text-sm max-w-2xl mx-auto">
            <div className="flex flex-col items-center">
              <CheckCircle2 className="h-5 w-5 text-green-400 mb-1" />
              <span>14 jours gratuits</span>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-5 w-5 text-blue-400 mb-1" />
              <span>100% sécurisé</span>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-5 w-5 text-pink-400 mb-1" />
              <span>12,500+ utilisateurs</span>
            </div>
            <div className="flex flex-col items-center">
              <Star className="h-5 w-5 text-yellow-400 mb-1" />
              <span>4.9/5 étoiles</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8" role="contentinfo">
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
                Gérez, analysez et valorisez votre cave avec intelligence artificielle.
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
                <li><Link to="/signup" className="hover:text-white transition-colors">Fonctionnalités</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Tarifs</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">API</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Intégrations</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Sécurité</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-white mb-4">Entreprise</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><Link to="/signup" className="hover:text-white transition-colors">À propos</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Carrières</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Presse</Link></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400">
                <span>© 2025 Tchin. Tous droits réservés.</span>
                <div className="flex gap-4">
                  <Link to="/signup" className="hover:text-white transition-colors">Politique de confidentialité</Link>
                  <Link to="/signup" className="hover:text-white transition-colors">CGU</Link>
                  <Link to="/signup" className="hover:text-white transition-colors">Cookies</Link>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span>4.9/5 sur 1,200+ avis</span>
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
