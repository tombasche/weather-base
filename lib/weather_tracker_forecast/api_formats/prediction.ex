defmodule WeatherTrackerForecast.Prediction do
  @moduledoc false

  defstruct [
    :timestamp,
    :rainfall,
    :snow
  ]

  def from_api_response(api_response) do
    api_response.hourly |> to_format()
  end

  defp to_format(raw) do
    timestamps = Enum.map(raw.time, &to_naive_dt/1) |> Enum.filter(& &1)
    snow = raw.snowfall
    rain = raw.rain

    [timestamps, snow, rain]
    |> List.zip()
    |> Enum.map(&Tuple.to_list/1)
    |> Enum.map(&expand_to_object/1)
  end

  defp expand_to_object(values) do
    timestamp = Enum.at(values, 0)
    snow = Enum.at(values, 1)
    rain = Enum.at(values, 2)
    %{timestamp: timestamp, snow_cm: snow, rain_mm: rain}
  end

  defp to_naive_dt(raw_time) do
    case raw_time
         |> Kernel.<>(":00.000Z")
         |> NaiveDateTime.from_iso8601() do
      {:ok, result} -> result
      {:error, _} -> nil
    end
  end
end
