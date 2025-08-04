"""Sérialiseurs pour l'API REST de l'application Cave à Vin.

Ce module contient les sérialiseurs Django REST Framework pour :
- La sérialisation des bouteilles de vin
- L'enregistrement d'utilisateurs
- Les profils utilisateur avec statistiques
"""
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import Bottle


class BottleSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Bottle.
    
    Gère la sérialisation/désérialisation des bouteilles de vin pour l'API.
    Le champ 'owner' est en lecture seule et automatiquement assigné à l'utilisateur connecté.
    
    Attributes:
        Meta.model: Modèle Bottle associé
        Meta.fields: Tous les champs du modèle
        Meta.read_only_fields: Champs en lecture seule (owner)
    """
    class Meta:
        model = Bottle
        fields = '__all__'
        read_only_fields = ('owner',)

class UserRegistrationSerializer(serializers.ModelSerializer):
    """Sérialiseur pour l'enregistrement de nouveaux utilisateurs.
    
    Gère la création de comptes utilisateur avec validation des mots de passe.
    Inclut la confirmation du mot de passe et applique les validateurs Django.
    
    Attributes:
        password (CharField): Mot de passe avec validation
        password_confirm (CharField): Confirmation du mot de passe
        
    Methods:
        validate: Vérifie que les mots de passe correspondent
        create: Crée un nouvel utilisateur avec mot de passe hashé
    """
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'password', 'password_confirm')
    
    def validate(self, attrs):
        """Valide que les mots de passe correspondent.
        
        Args:
            attrs (dict): Données d'entrée à valider
            
        Returns:
            dict: Données validées
            
        Raises:
            ValidationError: Si les mots de passe ne correspondent pas
        """
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Les mots de passe ne correspondent pas.")
        return attrs
    
    def create(self, validated_data):
        """Crée un nouvel utilisateur.
        
        Args:
            validated_data (dict): Données validées pour la création
            
        Returns:
            User: Nouvel utilisateur créé avec mot de passe hashé
        """
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    """Sérialiseur pour les profils utilisateur avec statistiques.
    
    Fournit les informations de profil utilisateur enrichies avec :
    - Le nom complet formaté
    - Le nombre total de bouteilles dans la cave
    
    Attributes:
        full_name (SerializerMethodField): Nom complet calculé
        bottles_count (SerializerMethodField): Nombre de bouteilles
        
    Methods:
        get_full_name: Construit le nom complet à partir des champs nom/prénom
        get_bottles_count: Compte le nombre de bouteilles de l'utilisateur
    """
    full_name = serializers.SerializerMethodField()
    bottles_count = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'full_name', 'bottles_count', 'date_joined')
    
    def get_full_name(self, obj):
        """Construit le nom complet de l'utilisateur.
        
        Priorité : prénom + nom, ou prénom seul, ou nom seul, ou nom d'utilisateur.
        
        Args:
            obj (User): Instance utilisateur
            
        Returns:
            str: Nom complet formaté ou nom d'utilisateur par défaut
        """
        if obj.first_name and obj.last_name:
            return f"{obj.first_name} {obj.last_name}"
        elif obj.first_name:
            return obj.first_name
        elif obj.last_name:
            return obj.last_name
        return obj.username
    
    def get_bottles_count(self, obj):
        """Compte le nombre total de bouteilles de l'utilisateur.
        
        Args:
            obj (User): Instance utilisateur
            
        Returns:
            int: Nombre de bouteilles dans la cave de l'utilisateur
        """
        return obj.bottles.count()
