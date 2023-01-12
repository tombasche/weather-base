#!/bin/bash

set -e

mix deps.get 
mix deps.compile

mix ecto.create
mix ecto.migrate
echo "Database created."

MIX_ENV=prod mix grpc.server & 
mix phx.server