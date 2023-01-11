defmodule WeatherTrackerForecast.Prediction do
  @moduledoc false

  defstruct [
    :timestamp,
    :rainfall,
    :snow
  ]

  def from_api_response(api_response) do
    api_response["hourly"]
    |> to_format()
    |> Enum.filter(fn obj -> obj.timestamp != nil end)
  end

  defp to_format(raw) do
    timestamps = Enum.map(raw["time"], &to_naive_dt/1)

    [timestamps, raw["snowfall"], raw["rain"]]
    |> List.zip()
    |> Enum.map(&Tuple.to_list/1)
    |> Enum.map(&expand_to_object/1)
  end

  defp expand_to_object(values) do
    %{timestamp: Enum.at(values, 0), snow_cm: Enum.at(values, 1), rain_mm: Enum.at(values, 2)}
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
