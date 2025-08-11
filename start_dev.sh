#!/bin/bash
# Script de démarrage pour développement - Cave à Vin

echo "🚀 Démarrage de Cave à Vin en mode développement"
echo "================================================"

# Configuration des variables d'environnement pour éviter CORS
export DEBUG=True
export SECRET_KEY="dev-secret-key-for-caveavin-$(date +%s)"
export ALLOWED_HOSTS="localhost,127.0.0.1,0.0.0.0"

echo "🔧 Variables d'environnement configurées:"
echo "   DEBUG=$DEBUG"
echo "   ALLOWED_HOSTS=$ALLOWED_HOSTS"

# Fonction pour vérifier si un port est libre
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 1  # Port occupé
    else
        return 0  # Port libre
    fi
}

# Démarrer le backend
echo ""
echo "📦 Démarrage du backend Django..."
if check_port 8000; then
    cd backend/
    echo "   Lancement sur http://127.0.0.1:8000"
    python manage.py runserver 127.0.0.1:8000 &
    BACKEND_PID=$!
    echo "   Backend démarré (PID: $BACKEND_PID)"
    cd ..
else
    echo "   ⚠️  Le port 8000 est déjà utilisé"
    echo "   Le backend est probablement déjà démarré"
fi

# Attendre que le backend soit prêt
echo ""
echo "⏳ Attente du backend..."
for i in {1..30}; do
    if curl -s http://127.0.0.1:8000/api/ > /dev/null 2>&1; then
        echo "✅ Backend prêt!"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ Timeout - Backend non accessible"
        exit 1
    fi
    sleep 1
done

# Démarrer le frontend
echo ""
echo "🎨 Démarrage du frontend React..."
if check_port 5173; then
    cd frontend/
    echo "   Lancement sur http://localhost:5173"
    npm run dev &
    FRONTEND_PID=$!
    echo "   Frontend démarré (PID: $FRONTEND_PID)"
    cd ..
else
    echo "   ⚠️  Le port 5173 est déjà utilisé"
    echo "   Le frontend est probablement déjà démarré"
fi

echo ""
echo "🎉 Cave à Vin est prêt !"
echo "   Backend:  http://127.0.0.1:8000"
echo "   Frontend: http://localhost:5173"
echo "   Admin:    http://127.0.0.1:8000/admin/"
echo ""
echo "💡 Pour diagnostiquer CORS: ./diagnose_cors.sh"
echo "🛑 Pour arrêter: Ctrl+C ou kill $BACKEND_PID $FRONTEND_PID"

# Attendre l'interruption
wait