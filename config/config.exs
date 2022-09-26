import Config

config :weather_tracker,
  ecto_repos: [WeatherTracker.Repo],
  generators: [binary_id: true]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config(:phoenix, :json_library, Jason)

import_config("#{config_env()}.exs")
