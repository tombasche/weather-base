defmodule SummaryTime do
  @moduledoc false
  defstruct time: nil, unit: "hours"
end

defmodule WeatherTrackerForecast.ApiFormats.PredictionSummaryResponse do
  @moduledoc false
  defstruct amount: nil, over: %SummaryTime{}, at: nil

  def from_raw([]) do
    %{}
  end

  def from_raw(data) do
    as_map = Enum.map(data, &Map.from_struct/1)
    %{rain: rain_summary(as_map), snow: snow_summary(as_map)}
  end

  defp rain_summary(data) do
    %{
      amount: sum_timeseries(data, :rain_mm),
      over: %{
        time: length(data),
        unit: "hours"
      },
      at: event_starting(data)
    }
  end

  defp snow_summary(data) do
    %{
      amount: sum_timeseries(data, :snow_cm),
      over: %{
        time: length(data),
        unit: "hours"
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
