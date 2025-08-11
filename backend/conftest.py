"""
Configuration globale pour les tests pytest
"""
import pytest
from django.contrib.auth.models import User
from django.test import Client
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken
from caveavin.models import Bottle


@pytest.fixture
def api_client():
    """Client API pour les tests"""
    return APIClient()


@pytest.fixture
def user(db):
    """Utilisateur de test"""
    return User.objects.create_user(
        username='testuser',
        email='test@example.com',
        password='testpass123',
        first_name='Test',
        last_name='User'
    )


@pytest.fixture 
def another_user(db):
    """Deuxième utilisateur pour tester l'isolation"""
    return User.objects.create_user(
        username='otheruser',
        email='other@example.com',
        password='otherpass123'
    )


@pytest.fixture
def authenticated_client(api_client, user):
    """Client API authentifié"""
    refresh = RefreshToken.for_user(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')
    return api_client


@pytest.fixture
def sample_bottle(user):
    """Bouteille de test"""
    return Bottle.objects.create(
        name="Château Test",
        year=2020,
        productor="Test Winery",
        color="Rouge",
        region="Test Region",
        appellation="Test AOC",
        grape_varieties="Cabernet Sauvignon",
        alcohol_content=13.5,
        quantity=6,
        location="Cave A, Casier 1",
        status="En cave",
        purchase_price=25.50,
        notes="Vin de test pour les tests automatisés",
        owner=user
    )


@pytest.fixture
def sample_bottles(user):
    """Collection de bouteilles de test"""
    bottles = []
    for i in range(5):
        bottle = Bottle.objects.create(
            name=f"Test Wine {i+1}",
            year=2018 + i,
            productor=f"Producer {i+1}",
            color="Rouge" if i % 2 == 0 else "Blanc",
            region=f"Region {i+1}",
            quantity=3 + i,
            owner=user
        )
        bottles.append(bottle)
    return bottles