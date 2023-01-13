defmodule WeatherTrackerForecast.ForecastJobService do
  @moduledoc false

  alias WeatherTrackerForecast.WeatherForecast.PredictionRepository
  alias WeatherTrackerForecast.PredictionService

  require Logger

  def fetch(get_today) do
    today = get_today.()

    case PredictionService.get_predictions(start_date(today), end_date(today)) do
      {:ok, result} ->
        save_entries(result)

      {:error, reason} ->
        log_failure(reason)
    end
  end

  defp save_entries(entries) do
    Enum.each(entries, &PredictionRepository.create_entry/1)
    {:ok, entries}
  end

  defp log_failure(reason) do
    Logger.error("Error getting prediction data #{reason}")
    {:error, reason}
  end

  defp start_date(today) do
    today |> format_date()
  end

  defp end_date(today) do
    today |> DateTime.add(24 * 60 * 60) |> format_date()
  end

  defp format_date(date) do
    date |> Calendar.strftime("%Y-%m-%d")
  end
end
