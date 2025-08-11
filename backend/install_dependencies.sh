#!/bin/bash
# Script d'installation des dépendances de sécurité pour Cave à Vin

echo "🔧 Installation des dépendances de sécurité..."

# Activer l'environnement virtuel si il existe
if [ -d "venv" ]; then
    echo "Activation de l'environnement virtuel..."
    source venv/bin/activate
fi

# Installer les nouvelles dépendances
echo "📦 Installation des packages Python..."
pip install pytest==8.3.3
pip install pytest-django==4.9.0 
pip install pytest-cov==6.0.0
pip install factory-boy==3.3.1
pip install python-magic==0.4.27

# Note: pillow-simd nécessite une compilation spéciale
echo "⚠️  Pour pillow-simd, exécutez manuellement:"
echo "pip uninstall Pillow"
echo "pip install pillow-simd==10.0.1"

echo "✅ Installation terminée!"
echo ""
echo "🧪 Pour exécuter les tests:"
echo "pytest"
echo ""
echo "📊 Pour la couverture de code:"
echo "pytest --cov=caveavin"