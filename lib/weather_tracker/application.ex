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
         interval: forecast_fetch_interval()
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

  defp forecast_fetch_interval() do
    Application.get_env(:weather_tracker, :forecast_fetch_interval)
  end
end
