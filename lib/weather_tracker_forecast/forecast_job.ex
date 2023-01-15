defmodule WeatherForecast.ForecastJob do
  @moduledoc false
  alias WeatherTrackerForecast.ForecastJobService
  use GenServer, restart: :transient

  require Logger

  def start_link(options \\ %{}) do
    Logger.info("Started prediction fetch job - running every #{options[:interval]}ms")
    GenServer.start_link(__MODULE__, options, name: __MODULE__)
  end

  @impl true
  def init(options) do
    state = %{
      interval: options[:interval]
    }

    schedule_next_fetch(state.interval)
    {:ok, state}
  end

  defp schedule_next_fetch(interval) do
    Process.send_after(self(), :fetch_data, interval)
  end

  @impl true
  def handle_info(:fetch_data, state) do
    {:noreply, state |> fetch()}
  end

  def fetch(state) do
    today_fn = &DateTime.utc_now/0

    ForecastJobService.fetch(today_fn)

    schedule_next_fetch(state.interval)

    %{
      interval: state.interval
    }
  end
end
