#!/bin/bash
set -e

echo "Running migrations..."
python manage.py migrate --settings=config.settings_prod

echo "Collecting static files..."
python manage.py collectstatic --noinput --settings=config.settings_prod

echo "Starting Gunicorn..."
exec gunicorn config.wsgi --bind 0.0.0.0:$PORT