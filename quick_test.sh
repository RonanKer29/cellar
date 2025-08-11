#!/bin/bash
# Test rapide de l'état de l'application

echo "🔍 Test rapide de Cave à Vin"
echo "==========================="

# Test backend
echo "1. Backend sur http://127.0.0.1:8000..."
if curl -s http://127.0.0.1:8000/api/ > /dev/null 2>&1; then
    echo "✅ Backend accessible"
else
    echo "❌ Backend non accessible"
    echo "   Démarrer avec: cd backend && python3 manage.py runserver 127.0.0.1:8000"
fi

# Test CORS simple  
echo ""
echo "2. Test CORS..."
CORS_HEADERS=$(curl -s -I -X OPTIONS -H "Origin: http://localhost:5173" http://127.0.0.1:8000/api/token/ | grep -i "access-control" | wc -l)
if [ "$CORS_HEADERS" -gt 0 ]; then
    echo "✅ Headers CORS présents"
else
    echo "⚠️  Headers CORS absents ou serveur non accessible"
fi

echo ""
echo "📱 Application:"
echo "   Backend:  http://127.0.0.1:8000"
echo "   Frontend: http://localhost:5173" 
echo "   Admin:    http://127.0.0.1:8000/admin/"