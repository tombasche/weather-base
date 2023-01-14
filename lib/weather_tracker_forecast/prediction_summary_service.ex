defmodule WeatherTrackerForecast.PredictionSummaryService do
  @moduledoc false

  # TODO this accepts start and end date, queries the predictions table for the next non-zero sequence of either
  # rain or snow predictions and passes this to summary/1
  def generate_summary_data(start_date, end_date) do
    []
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
      }
    }
  end

  defp snow_summary(data) do
    %{
      amount: sum_timeseries(data, :snow_cm),
      over: %{
        time: length(data),
        unit: 'hours'
      }
    }
  end

  defp sum_timeseries(ts, field_name) do
    Enum.map(ts, & &1[field_name]) |> Enum.sum() |> Float.round(1)
  end
end
