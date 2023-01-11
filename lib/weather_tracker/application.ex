defmodule WeatherTracker.Application do
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      WeatherTracker.Repo,
      {GRPC.Server.Supervisor, {WeatherTrackerWeb.Endpoint, 50_051, start_server: true}},
      WeatherTrackerWeb.Endpoint,
      {WeatherForecast.ForecastJob,
       %{
         # TODO make this an env var
         interval: 5000
       }}
    ]

    opts = [strategy: :one_for_one, name: WeatherTracker.Supervisor]
    Supervisor.start_link(children, opts)
  end

  @impl true
  def config_change(changed, _new, removed) do
    WeatherTrackerWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
