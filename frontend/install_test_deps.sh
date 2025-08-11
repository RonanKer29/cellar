#!/bin/bash
# Script d'installation des dépendances de test frontend

echo "🔧 Installation des dépendances de test frontend..."

# Installer les dépendances de test
echo "📦 Installation des packages npm..."
npm install --save-dev \
  @testing-library/react@^16.1.0 \
  @testing-library/jest-dom@^6.8.1 \
  @testing-library/user-event@^14.5.2 \
  vitest@^3.1.8 \
  jsdom@^26.0.0 \
  @vitest/ui@^3.1.8 \
  @vitest/coverage-v8@^3.1.8

echo "✅ Installation terminée!"
echo ""
echo "🧪 Pour exécuter les tests:"
echo "npm test"
echo ""
echo "🌐 Interface graphique des tests:"
echo "npm run test:ui"
echo ""
echo "📊 Couverture de code:"
echo "npm run test:coverage"