from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from caveavin.models import Bottle
from decimal import Decimal
from datetime import date, timedelta
import random


class Command(BaseCommand):
    help = 'Ajoute 10 vins différents avec des quantités variées'

    def handle(self, *args, **options):
        # Récupérer ou créer un utilisateur admin pour les bouteilles
        admin_user, created = User.objects.get_or_create(
            username='admin',
            defaults={
                'email': 'admin@caveavin.com',
                'first_name': 'Admin',
                'last_name': 'CaveAVin'
            }
        )
        if created:
            admin_user.set_password('admin123')
            admin_user.save()
            self.stdout.write(
                self.style.SUCCESS('Utilisateur admin créé avec succès')
            )

        # Données des 10 vins
        wines_data = [
            {
                'name': 'Château Margaux',
                'year': 2018,
                'productor': 'Château Margaux',
                'country': 'France',
                'region': 'Margaux, Bordeaux',
                'color': Bottle.RED,
                'grape': 'Cabernet Sauvignon, Merlot',
                'quantity': 3,
                'price': Decimal('450.00'),
                'estimated_value': Decimal('480.00'),
                'description': 'Grand cru classé exceptionnel de Margaux',
                'tasting_note': 'Arômes complexes de fruits noirs, notes florales élégantes',
                'rating': 5
            },
            {
                'name': 'Dom Pérignon',
                'year': 2012,
                'productor': 'Moët & Chandon',
                'country': 'France',
                'region': 'Champagne',
                'color': Bottle.SPARKLING,
                'grape': 'Chardonnay, Pinot Noir',
                'quantity': 6,
                'price': Decimal('180.00'),
                'estimated_value': Decimal('200.00'),
                'description': 'Champagne prestigieux millésimé',
                'tasting_note': 'Bulles fines, notes de brioche et fruits blancs',
                'rating': 5
            },
            {
                'name': 'Chablis Premier Cru',
                'year': 2020,
                'productor': 'Domaine William Fèvre',
                'country': 'France',
                'region': 'Chablis, Bourgogne',
                'color': Bottle.WHITE,
                'grape': 'Chardonnay',
                'quantity': 12,
                'price': Decimal('35.00'),
                'estimated_value': Decimal('38.00'),
                'description': 'Chablis minéral et élégant',
                'tasting_note': 'Fraîcheur minérale, notes d\'agrumes et de pierre à fusil',
                'rating': 4
            },
            {
                'name': 'Barolo Brunate',
                'year': 2017,
                'productor': 'Roberto Voerzio',
                'country': 'Italie',
                'region': 'Piémont',
                'color': Bottle.RED,
                'grape': 'Nebbiolo',
                'quantity': 2,
                'price': Decimal('85.00'),
                'estimated_value': Decimal('95.00'),
                'description': 'Barolo d\'exception du Piémont italien',
                'tasting_note': 'Puissance et élégance, tanins soyeux, longue finale',
                'rating': 5
            },
            {
                'name': 'Sancerre Les Monts Damnés',
                'year': 2021,
                'productor': 'Chavignol',
                'country': 'France',
                'region': 'Loire',
                'color': Bottle.WHITE,
                'grape': 'Sauvignon Blanc',
                'quantity': 8,
                'price': Decimal('28.00'),
                'estimated_value': Decimal('30.00'),
                'description': 'Sancerre expressif et minéral',
                'tasting_note': 'Fraîcheur intense, notes de cassis et de silex',
                'rating': 4
            },
            {
                'name': 'Côtes du Rhône Villages',
                'year': 2019,
                'productor': 'E. Guigal',
                'country': 'France',
                'region': 'Rhône',
                'color': Bottle.RED,
                'grape': 'Grenache, Syrah',
                'quantity': 15,
                'price': Decimal('18.00'),
                'estimated_value': Decimal('20.00'),
                'description': 'Côtes du Rhône généreux et épicé',
                'tasting_note': 'Fruits rouges mûrs, épices douces, belle rondeur',
                'rating': 3
            },
            {
                'name': 'Provence Rosé',
                'year': 2022,
                'productor': 'Château d\'Esclans',
                'country': 'France',
                'region': 'Provence',
                'color': Bottle.ROSE,
                'grape': 'Grenache, Cinsault',
                'quantity': 20,
                'price': Decimal('15.00'),
                'estimated_value': Decimal('16.00'),
                'description': 'Rosé de Provence frais et fruité',
                'tasting_note': 'Couleur pâle, arômes de fruits rouges et fleurs',
                'rating': 4
            },
            {
                'name': 'Riesling Kabinett',
                'year': 2020,
                'productor': 'Dr. Loosen',
                'country': 'Allemagne',
                'region': 'Moselle',
                'color': Bottle.WHITE,
                'grape': 'Riesling',
                'quantity': 5,
                'price': Decimal('22.00'),
                'estimated_value': Decimal('24.00'),
                'description': 'Riesling allemand délicat et aromatique',
                'tasting_note': 'Douceur équilibrée, acidité vive, notes de pêche',
                'rating': 4
            },
            {
                'name': 'Rioja Gran Reserva',
                'year': 2015,
                'productor': 'Marqués de Murrieta',
                'country': 'Espagne',
                'region': 'Rioja',
                'color': Bottle.RED,
                'grape': 'Tempranillo',
                'quantity': 4,
                'price': Decimal('45.00'),
                'estimated_value': Decimal('50.00'),
                'description': 'Rioja Gran Reserva traditionnel',
                'tasting_note': 'Élevage en fût, notes de cuir et épices, grande complexité',
                'rating': 4
            },
            {
                'name': 'Moscato d\'Asti',
                'year': 2022,
                'productor': 'Michele Chiarlo',
                'country': 'Italie',
                'region': 'Piémont',
                'color': Bottle.OTHER,
                'grape': 'Moscato',
                'quantity': 10,
                'price': Decimal('12.00'),
                'estimated_value': Decimal('13.00'),
                'description': 'Moscato d\'Asti doux et pétillant',
                'tasting_note': 'Douceur naturelle, arômes de muscat et pêche',
                'rating': 3
            }
        ]

        # Créer les bouteilles
        created_count = 0
        for wine_data in wines_data:
            # Ajouter des données aléatoires pour les dates
            purchase_date = date.today() - timedelta(days=random.randint(30, 365))
            
            bottle, created = Bottle.objects.get_or_create(
                name=wine_data['name'],
                year=wine_data['year'],
                productor=wine_data['productor'],
                defaults={
                    'owner': admin_user,
                    'country': wine_data['country'],
                    'region': wine_data['region'],
                    'color': wine_data['color'],
                    'grape': wine_data['grape'],
                    'quantity': wine_data['quantity'],
                    'price': wine_data['price'],
                    'estimated_value': wine_data['estimated_value'],
                    'description': wine_data['description'],
                    'tasting_note': wine_data['tasting_note'],
                    'rating': wine_data['rating'],
                    'purchase_date': purchase_date,
                    'purchase_place': random.choice([
                        'Cave Nicolas', 'Monoprix', 'Carrefour', 
                        'Caviste local', 'Vente directe propriété',
                        'Foire aux vins Leclerc', 'Vente en ligne'
                    ])
                }
            )
            
            if created:
                created_count += 1
                self.stdout.write(
                    f'✓ {wine_data["name"]} ({wine_data["year"]}) - Quantité: {wine_data["quantity"]}'
                )

        self.stdout.write(
            self.style.SUCCESS(
                f'\nSeed terminé avec succès ! {created_count} vins ajoutés.'
            )
        )
        
        # Afficher un résumé
        total_bottles = sum(wine['quantity'] for wine in wines_data)
        total_value = sum(
            wine['estimated_value'] * wine['quantity'] 
            for wine in wines_data
        )
        
        self.stdout.write(f'\n📊 Résumé de la cave:')
        self.stdout.write(f'• Nombre de références: {len(wines_data)}')
        self.stdout.write(f'• Nombre total de bouteilles: {total_bottles}')
        self.stdout.write(f'• Valeur estimée totale: {total_value}€')