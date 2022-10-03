defmodule WeatherTrackerWeb.Endpoint do
  use GRPC.Endpoint
  use Phoenix.Endpoint, otp_app: :weather_tracker

  intercept(GRPC.Logger.Server)
  run(WeatherTrackerWeb.Server)

  plug WeatherTrackerWeb.Router
end
