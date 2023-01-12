#!/bin/bash

set -e

export MIX_ENV=prod

mix deps.get --only prod
mix compile

mix ecto.create
mix ecto.migrate
echo "Database created."

mix grpc.server & 
PORT=4000 mix phx.server