"""
Tests complets pour l'application Cave à Vin
"""
import pytest
import tempfile
from django.contrib.auth.models import User
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
from rest_framework import status
from rest_framework.test import APIClient
from caveavin.models import Bottle
from caveavin.serializers import BottleSerializer


@pytest.mark.django_db
class TestUserAuthentication:
    """Tests d'authentification utilisateur"""
    
    def test_user_registration_success(self, api_client):
        """Test d'inscription utilisateur réussie"""
        data = {
            'username': 'newuser',
            'email': 'new@example.com',
            'password': 'NewPass123!',
            'password_confirm': 'NewPass123!',
            'first_name': 'New',
            'last_name': 'User'
        }
        
        response = api_client.post('/api/register/', data)
        assert response.status_code == status.HTTP_201_CREATED
        assert User.objects.filter(username='newuser').exists()
    
    def test_user_registration_password_mismatch(self, api_client):
        """Test d'inscription avec mots de passe différents"""
        data = {
            'username': 'newuser',
            'email': 'new@example.com', 
            'password': 'NewPass123!',
            'password_confirm': 'DifferentPass123!',
        }
        
        response = api_client.post('/api/register/', data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert not User.objects.filter(username='newuser').exists()
    
    def test_user_login_success(self, api_client, user):
        """Test de connexion réussie"""
        data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        
        response = api_client.post('/api/token/', data)
        assert response.status_code == status.HTTP_200_OK
        assert 'access' in response.data
        assert 'refresh' in response.data
    
    def test_user_login_invalid_credentials(self, api_client, user):
        """Test de connexion avec identifiants incorrects"""
        data = {
            'username': 'testuser',
            'password': 'wrongpassword'
        }
        
        response = api_client.post('/api/token/', data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
class TestBottleModel:
    """Tests du modèle Bottle"""
    
    def test_bottle_creation(self, user):
        """Test de création d'une bouteille"""
        bottle = Bottle.objects.create(
            name="Test Wine",
            year=2020,
            productor="Test Producer",
            color="Rouge",
            owner=user
        )
        
        assert bottle.name == "Test Wine"
        assert bottle.year == 2020
        assert bottle.owner == user
        assert str(bottle) == "Test Wine (2020) - Test Producer"
    
    def test_bottle_str_representation(self, sample_bottle):
        """Test de la représentation string d'une bouteille"""
        expected = f"{sample_bottle.name} ({sample_bottle.year}) - {sample_bottle.productor}"
        assert str(sample_bottle) == expected
    
    def test_bottle_default_values(self, user):
        """Test des valeurs par défaut"""
        bottle = Bottle.objects.create(
            name="Minimal Wine",
            year=2021,
            productor="Minimal Producer",
            color="Rouge",
            owner=user
        )
        
        assert bottle.quantity == 1  # Valeur par défaut
        assert bottle.alcohol_content is None
        assert bottle.status == "En cave"


@pytest.mark.django_db  
class TestBottleAPI:
    """Tests de l'API Bottle"""
    
    def test_get_bottles_authenticated(self, authenticated_client, sample_bottles):
        """Test récupération des bouteilles authentifié"""
        response = authenticated_client.get('/api/bottles/')
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == len(sample_bottles)
    
    def test_get_bottles_unauthenticated(self, api_client, sample_bottles):
        """Test récupération des bouteilles non authentifié"""
        response = api_client.get('/api/bottles/')
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
    
    def test_user_can_only_see_own_bottles(self, authenticated_client, user, another_user):
        """Test d'isolation des données entre utilisateurs"""
        # Créer des bouteilles pour chaque utilisateur
        user_bottle = Bottle.objects.create(
            name="User Wine",
            year=2020,
            productor="User Producer", 
            color="Rouge",
            owner=user
        )
        
        other_bottle = Bottle.objects.create(
            name="Other Wine",
            year=2020,
            productor="Other Producer",
            color="Rouge", 
            owner=another_user
        )
        
        response = authenticated_client.get('/api/bottles/')
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]['name'] == "User Wine"
    
    def test_create_bottle_success(self, authenticated_client):
        """Test de création d'une bouteille"""
        data = {
            'name': 'New Wine',
            'year': 2021,
            'productor': 'New Producer',
            'color': 'Rouge',
            'region': 'Test Region',
            'quantity': 3
        }
        
        response = authenticated_client.post('/api/bottles/', data)
        
        assert response.status_code == status.HTTP_201_CREATED
        assert Bottle.objects.filter(name='New Wine').exists()
    
    def test_create_bottle_validation_error(self, authenticated_client):
        """Test de validation à la création"""
        data = {
            'name': '',  # Nom vide - invalide
            'year': 1800,  # Année trop ancienne - invalide
            'productor': 'Producer',
            'color': 'Rouge'
        }
        
        response = authenticated_client.post('/api/bottles/', data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    
    def test_update_bottle_success(self, authenticated_client, sample_bottle):
        """Test de modification d'une bouteille"""
        data = {
            'name': 'Updated Wine Name',
            'year': sample_bottle.year,
            'productor': sample_bottle.productor,
            'color': sample_bottle.color,
            'quantity': 10
        }
        
        response = authenticated_client.put(f'/api/bottles/{sample_bottle.id}/', data)
        
        assert response.status_code == status.HTTP_200_OK
        sample_bottle.refresh_from_db()
        assert sample_bottle.name == 'Updated Wine Name'
        assert sample_bottle.quantity == 10
    
    def test_delete_bottle_success(self, authenticated_client, sample_bottle):
        """Test de suppression d'une bouteille"""
        bottle_id = sample_bottle.id
        
        response = authenticated_client.delete(f'/api/bottles/{bottle_id}/')
        
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert not Bottle.objects.filter(id=bottle_id).exists()
    
    def test_cannot_access_other_user_bottle(self, authenticated_client, another_user):
        """Test qu'un utilisateur ne peut pas accéder aux bouteilles d'un autre"""
        other_bottle = Bottle.objects.create(
            name="Other Wine",
            year=2020,
            productor="Other Producer",
            color="Rouge",
            owner=another_user
        )
        
        response = authenticated_client.get(f'/api/bottles/{other_bottle.id}/')
        assert response.status_code == status.HTTP_404_NOT_FOUND


@pytest.mark.django_db
class TestBottleSearch:
    """Tests de recherche et filtrage"""
    
    def test_search_by_name(self, authenticated_client, user):
        """Test de recherche par nom"""
        Bottle.objects.create(name="Château Margaux", year=2020, productor="Margaux", color="Rouge", owner=user)
        Bottle.objects.create(name="Château Latour", year=2020, productor="Latour", color="Rouge", owner=user)
        
        response = authenticated_client.get('/api/bottles/?search=Margaux')
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]['name'] == "Château Margaux"
    
    def test_filter_by_color(self, authenticated_client, user):
        """Test de filtrage par couleur"""
        Bottle.objects.create(name="Red Wine", year=2020, productor="Producer", color="Rouge", owner=user)
        Bottle.objects.create(name="White Wine", year=2020, productor="Producer", color="Blanc", owner=user)
        
        response = authenticated_client.get('/api/bottles/?color=Rouge')
        
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]['color'] == "Rouge"


@pytest.mark.django_db
class TestUserProfile:
    """Tests du profil utilisateur"""
    
    def test_get_profile_authenticated(self, authenticated_client, user, sample_bottles):
        """Test récupération du profil utilisateur"""
        response = authenticated_client.get('/api/profile/')
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data['username'] == user.username
        assert response.data['total_bottles'] == len(sample_bottles)
    
    def test_get_profile_unauthenticated(self, api_client):
        """Test récupération du profil non authentifié"""
        response = api_client.get('/api/profile/')
        
        assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
class TestImageUpload:
    """Tests d'upload d'images"""
    
    def create_test_image(self):
        """Créer une image de test"""
        with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as tmp:
            image = Image.new('RGB', (100, 100), color='red')
            image.save(tmp.name, 'JPEG')
            tmp.seek(0)
            return SimpleUploadedFile(
                name='test.jpg',
                content=tmp.read(),
                content_type='image/jpeg'
            )
    
    def test_bottle_image_upload_success(self, authenticated_client, user):
        """Test d'upload d'image réussi"""
        image = self.create_test_image()
        
        data = {
            'name': 'Wine with Image',
            'year': 2021,
            'productor': 'Producer',
            'color': 'Rouge',
            'image': image
        }
        
        response = authenticated_client.post('/api/bottles/', data, format='multipart')
        
        assert response.status_code == status.HTTP_201_CREATED
        bottle = Bottle.objects.get(name='Wine with Image')
        assert bottle.image is not None
