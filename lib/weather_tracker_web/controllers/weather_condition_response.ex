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

  def from_weather_condition(wc) do
    %{
      timestamp: wc.timestamp,
      pressure_pa: wc.pressure_pa,
      temperature_c: wc.temperature_c,
      humidity_rh: wc.humidity_rh,
      dew_point_c: wc.dew_point_c,
      iaq:
        calculate_iaq(Decimal.to_float(wc.gas_resistance_ohms), Decimal.to_float(wc.humidity_rh))
    }
  end
end
