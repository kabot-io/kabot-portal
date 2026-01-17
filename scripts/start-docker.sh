#!/bin/bash
# Start the Docker container

set -e

echo "Starting Docker container..."
docker-compose -f docker/docker-compose.yml up --build

echo "[OK] Docker container is running"
