#!/bin/bash

set -e

mix deps.get

mix ecto.create
mix ecto.migrate
echo "Database created."

ENV=prod mix grpc.server & 
mix phx.server