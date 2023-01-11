import Config

config :weather_tracker,
  ecto_repos: [WeatherTracker.Repo],
  generators: [binary_id: true]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :weather_tracker, WeatherTrackerWeb.Endpoint, url: [host: "localhost"]

config(:phoenix, :json_library, Jason)

config :weather_tracker, client: WeatherTrackerForecast.PredictionClient

# Milliseconds in 12 hours
config :weather_tracker, :forecast_fetch_interval, 43_200_000

import_config("#{config_env()}.exs")
