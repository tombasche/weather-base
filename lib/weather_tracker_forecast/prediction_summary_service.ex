defmodule WeatherTrackerForecast.PredictionSummaryService do
  @moduledoc false
  alias WeatherTrackerForecast.WeatherForecast.PredictionRepository

  def generate_summary_data(start_date, end_date) do
    query_result = PredictionRepository.predictions_for_date_range(start_date, end_date)
    # TODO map to a struct
    summary(query_result)
  end

  def summary(data) do
    %{rain: rain_summary(data), snow: snow_summary(data)}
  end

  defp rain_summary(data) do
    %{
      amount: sum_timeseries(data, :rain_mm),
      over: %{
        time: length(data),
        unit: 'hours'
      },
      at: event_starting(data)
    }
  end

  defp snow_summary(data) do
    %{
      amount: sum_timeseries(data, :snow_cm),
      over: %{
        time: length(data),
        unit: 'hours'
      },
      at: event_starting(data)
    }
  end

  defp sum_timeseries(ts, field_name) do
    Enum.map(ts, & &1[field_name]) |> Enum.sum() |> Float.round(1)
  end

  defp event_starting(ts) do
    List.first(ts) |> Access.get(:timestamp)
  end
end
