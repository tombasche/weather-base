defmodule WeatherTrackerWeb.WeatherConditionsResponse do
  @moduledoc false

  defstruct [
    :timestamp,
    :altitude_m,
    :pressure_pa,
    :temperature_c,
    :humidity_rh,
    :dew_point_c,
    :gas_resistance_ohms,
    :source,
    :iaq
  ]

  defp calculate_iaq(gas_resistance, humidity) do
    :math.log(gas_resistance) + 0.04 * humidity
  end

  defp decimals_to_api_format(decimal) do
    decimal |> Decimal.to_float() |> Kernel.round()
  end

  defp float_to_api_format(float) do
    float |> Kernel.round()
  end

  def from_weather_condition(wc) do
    %{
      timestamp: wc.timestamp,
      temperature_c: decimals_to_api_format(wc.temperature_c),
      humidity_rh: decimals_to_api_format(wc.humidity_rh),
      iaq:
        float_to_api_format(
          calculate_iaq(
            Decimal.to_float(wc.gas_resistance_ohms),
            Decimal.to_float(wc.humidity_rh)
          )
        ),
      feels_like_c: 14
    }
  end
end
