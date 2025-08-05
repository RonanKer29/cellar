import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
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
  Award
} from 'lucide-react';

/**
 * Page d'accueil (Landing Page) professionnelle pour Cave à Vin
 * Design SaaS moderne avec présentation des fonctionnalités
 */
const Landing = () => {
  const features = [
    {
      icon: <Wine className="h-8 w-8 text-pink-600" />,
      title: "Gestion Complète",
      description: "Cataloguez vos vins avec toutes les informations importantes : millésime, région, cépages, notes de dégustation."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      title: "Statistiques Avancées",
      description: "Analysez votre collection avec des statistiques détaillées sur vos habitudes et la valeur de votre cave."
    },
    {
      icon: <Filter className="h-8 w-8 text-pink-600" />,
      title: "Recherche Intelligente",
      description: "Trouvez rapidement vos vins grâce aux filtres avancés par région, couleur, prix et notes de dégustation."
    },
    {
      icon: <Camera className="h-8 w-8 text-purple-600" />,
      title: "Photos Optimisées",
      description: "Ajoutez des photos de vos bouteilles avec compression automatique pour un aperçu visuel parfait."
    }
  ];

  const benefits = [
    "Ne perdez plus jamais de vue vos meilleures bouteilles",
    "Optimisez vos achats grâce aux statistiques",
    "Partagez vos découvertes avec d'autres amateurs",
    "Suivez l'évolution de la valeur de votre collection"
  ];

  const stats = [
    { label: "Utilisateurs actifs", value: "2,500+" },
    { label: "Bouteilles cataloguées", value: "45,000+" },
    { label: "Régions couvertes", value: "120+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-2 rounded-lg">
                <Wine className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Ma Cave à Vin
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-600 hover:text-pink-600">
                  Connexion
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                  Essayer Gratuitement
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-pink-100 text-pink-700 hover:bg-pink-200">
              🍷 La solution #1 pour les amateurs de vin
            </Badge>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Gérez votre{' '}
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                cave à vin
              </span>
              <br />
              comme un pro
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Cataloguez, organisez et suivez votre collection de vins avec intelligence. 
              Des statistiques avancées aux notes de dégustation, tout ce dont vous avez besoin 
              pour optimiser votre passion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-lg px-8 py-3"
                >
                  Commencer Gratuitement
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-pink-300 text-pink-700 hover:bg-pink-50 text-lg px-8 py-3"
              >
                Voir la Démo
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une suite complète d'outils pour gérer votre passion du vin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Pourquoi choisir{' '}
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Ma Cave à Vin
                </span> ?
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Card className="bg-gradient-to-br from-pink-100 to-purple-100 border-0 shadow-2xl">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-3 rounded-full">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">+127%</div>
                        <div className="text-sm text-gray-600">Connaissance de votre collection</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-3 rounded-full">
                        <Star className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                        <div className="text-sm text-gray-600">Satisfaction utilisateur</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">120+</div>
                        <div className="text-sm text-gray-600">Régions viticoles couvertes</div>
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prêt à révolutionner votre cave ?
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'amateurs de vin qui ont déjà transformé 
            leur façon de gérer leur collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-white text-pink-600 hover:bg-pink-50 text-lg px-8 py-3"
              >
                Commencer Maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <p className="text-pink-200 text-sm mt-4">
            Aucune carte de crédit requise • Configuration en 2 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-2 rounded-lg">
              <Wine className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">Ma Cave à Vin</span>
          </div>
          <p className="text-gray-400 mb-4">
            La solution professionnelle pour les passionnés de vin
          </p>
          <div className="flex justify-center gap-8 text-sm text-gray-400">
            <Link to="/login" className="hover:text-white transition-colors">Connexion</Link>
            <Link to="/signup" className="hover:text-white transition-colors">Inscription</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;