#!/bin/bash
# Stop the Docker container

set -e

echo "Stopping Docker container..."
docker compose -f docker/docker-compose.yml down

echo "[OK] Docker container stopped"
