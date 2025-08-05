#!/bin/bash
set -e

# Set Django settings
export DJANGO_SETTINGS_MODULE=config.settings_prod

echo "Waiting for database..."
until python -c "
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings_prod')
import django
django.setup()
from django.db import connection
connection.ensure_connection()
print('Database is ready!')
"; do
  echo "Database is not ready - sleeping..."
  sleep 2
done

echo "Running migrations..."
python manage.py migrate

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting Gunicorn..."
echo "Port: ${PORT:-8000}"
gunicorn config.wsgi --bind 0.0.0.0:${PORT:-8000} --timeout 120 --workers 2 --worker-connections 1000 --preload