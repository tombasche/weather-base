import Config

if System.get_env("PHX_SERVER") do
  config :weather_tracker, WeatherTrackerWeb.Endpoint, server: true
end

if config_env() == :prod do
  database_url =
    System.get_env("DATABASE_URL") ||
      raise """
      environment variable DATABASE_URL is missing.
      For example: ecto://USER:PASS@HOST/DATABASE
      """

  maybe_ipv6 = if System.get_env("ECTO_IPV6"), do: [:inet6], else: []

  port = String.to_integer(System.get_env("PORT") || "4000")

  config :weather_tracker, WeatherTrackerWeb.Endpoint,
    url: [host: "localhost", port: 443, scheme: "https"],
    http: [
      ip: {0, 0, 0, 0, 0, 0, 0, 0},
      port: port
    ],
    secret_key_base: "some-secret-or-not-so-secret-key"

  config :weather_tracker, WeatherTracker.Repo,
    # ssl: true,
    url: database_url,
    pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10"),
    socket_options: maybe_ipv6
end
