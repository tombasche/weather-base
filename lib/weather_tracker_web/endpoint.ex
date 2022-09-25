defmodule WeatherTrackerWeb.Endpoint do
  use GRPC.Endpoint

  intercept(GRPC.Logger.Server)
  run(WeatherTrackerWeb.Server)
end
