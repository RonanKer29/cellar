#!/bin/bash
# Script de diagnostic CORS pour Cave à Vin

echo "🔍 Diagnostic CORS pour Cave à Vin"
echo "=================================="

# Vérifier si le backend est en cours d'exécution
echo "1. Vérification du backend..."
if curl -s http://127.0.0.1:8000/api/ > /dev/null 2>&1; then
    echo "✅ Backend accessible sur http://127.0.0.1:8000"
else
    echo "❌ Backend non accessible sur http://127.0.0.1:8000"
    echo "   Assurez-vous que Django est démarré avec:"
    echo "   cd backend && python manage.py runserver 127.0.0.1:8000"
    exit 1
fi

# Test d'une requête CORS simple
echo ""
echo "2. Test de requête CORS..."
CORS_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "Origin: http://localhost:5173" \
    -H "Access-Control-Request-Method: POST" \
    -H "Access-Control-Request-Headers: authorization,content-type" \
    -X OPTIONS \
    http://127.0.0.1:8000/api/token/)

if [ "$CORS_RESPONSE" == "200" ] || [ "$CORS_RESPONSE" == "204" ]; then
    echo "✅ Preflight CORS: $CORS_RESPONSE (OK)"
else
    echo "❌ Preflight CORS: $CORS_RESPONSE (ÉCHEC)"
fi

# Test des headers CORS
echo ""
echo "3. Vérification des headers CORS..."
curl -s -I \
    -H "Origin: http://localhost:5173" \
    -X OPTIONS \
    http://127.0.0.1:8000/api/token/ | grep -i "access-control"

# Vérifier la configuration Django
echo ""
echo "4. Vérification de la configuration..."
echo "   Backend: http://127.0.0.1:8000"
echo "   Frontend: probablement http://localhost:5173"
echo ""
echo "🔧 Solutions possibles:"
echo "1. Redémarrer le serveur Django:"
echo "   cd backend && python manage.py runserver 127.0.0.1:8000"
echo ""
echo "2. Vérifier que django-cors-headers est installé:"
echo "   pip install django-cors-headers"
echo ""
echo "3. Si le problème persiste, définir DEBUG=True temporairement:"
echo "   export DEBUG=True"
echo "   python manage.py runserver"

# Test de connectivité réseau
echo ""
echo "5. Test de connectivité réseau..."
if curl -s http://127.0.0.1:8000/admin/ > /dev/null 2>&1; then
    echo "✅ Django admin accessible - le serveur fonctionne"
else
    echo "❌ Django admin non accessible - vérifiez le serveur"
fi