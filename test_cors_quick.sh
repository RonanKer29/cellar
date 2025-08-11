#!/bin/bash
# Test CORS rapide

echo "🔍 Test CORS rapide"
echo "=================="

# Test si le serveur répond
echo "1. Test serveur sur 127.0.0.1:8001..."
if curl -s http://127.0.0.1:8001/api/ > /dev/null 2>&1; then
    echo "✅ Serveur accessible"
else
    echo "❌ Serveur non accessible"
    echo "Démarrer avec: python3 manage.py runserver --settings=config.settings_debug 127.0.0.1:8001"
    exit 1
fi

# Test OPTIONS (preflight)
echo ""
echo "2. Test preflight CORS..."
curl -v -X OPTIONS \
    -H "Origin: http://localhost:5173" \
    -H "Access-Control-Request-Method: POST" \
    -H "Access-Control-Request-Headers: authorization,content-type" \
    http://127.0.0.1:8001/api/token/ 2>&1 | grep -E "(HTTP|Access-Control)"

# Test POST réel
echo ""
echo "3. Test POST réel..."
curl -v -X POST \
    -H "Origin: http://localhost:5173" \
    -H "Content-Type: application/json" \
    -d '{"username":"test","password":"test"}' \
    http://127.0.0.1:8001/api/token/ 2>&1 | grep -E "(HTTP|Access-Control|error)"

echo ""
echo "💡 Si CORS fonctionne, modifier le frontend pour utiliser le port 8001:"
echo "   VITE_API_BASE_URL=http://127.0.0.1:8001/api"