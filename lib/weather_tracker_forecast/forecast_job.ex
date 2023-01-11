defmodule WeatherForecast.ForecastJob do
  alias WeatherTrackerForecast.PredictionService
  use GenServer, restart: :transient

  require Logger

  def start_link(options \\ %{}) do
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

  defp fetch(state) do
    start_date = "2023-01-01"
    end_date = "2023-01-01"
    result = PredictionService.get_predictions(start_date, end_date)

    IO.inspect(result)

    schedule_next_fetch(state.interval)

    %{
      interval: state.interval
    }
  end
end
