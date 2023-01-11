defmodule WeatherForecast.ForecastJob do
  @moduledoc false
  alias WeatherTrackerForecast.WeatherForecast.PredictionRepository
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
    today = DateTime.utc_now()

    start_date = today |> Calendar.strftime("%Y-%m-%d")
    end_date = today |> DateTime.add(24 * 60 * 60) |> Calendar.strftime("%Y-%m-%d")

    case PredictionService.get_predictions(start_date, end_date) do
      {:ok, result} -> Enum.each(result, &PredictionRepository.create_entry/1)
      {:error, reason} -> Logger.error("Error getting prediction data #{reason}")
    end

    schedule_next_fetch(state.interval)

    %{
      interval: state.interval
    }
  end
end
