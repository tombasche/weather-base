defmodule WeatherTrackerWeb.WeatherConditionAggregatedResponse do
  @moduledoc false

  defstruct [
    :timestamp,
    :temperature_c
  ]

  defp decimals_to_api_format(decimal) do
    decimal |> Decimal.to_float() |> Kernel.round()
  end

  def from_weather_condition(wc) do
    %{
      timestamp: wc.timestamp,
      temperature_c: decimals_to_api_format(wc.temperature_c)
    }
  end
end
