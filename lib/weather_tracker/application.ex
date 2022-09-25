defmodule WeatherTracker.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      WeatherTracker.Repo,
      # Start the Telemetry supervisor
      WeatherTrackerWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: WeatherTracker.PubSub},
      {GRPC.Server.Supervisor, {WeatherTrackerWeb.Endpoint, 50051}}
      # Start a worker by calling: WeatherTracker.Worker.start_link(arg)
      # {WeatherTracker.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: WeatherTracker.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
