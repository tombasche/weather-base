defmodule WeatherTracker.Application do
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      WeatherTracker.Repo,
      {GRPC.Server.Supervisor, {WeatherTrackerWeb.Endpoint, 50_051, start_server: true}}
    ]

    opts = [strategy: :one_for_one, name: WeatherTracker.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
