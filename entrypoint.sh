#!/bin/bash

set -e

# Ensure the app's dependencies are installed
mix deps.get

# Create, migrate, and seed database if it doesn't exist.
mix ecto.create
mix ecto.migrate
echo "Database created."

mix phx.server