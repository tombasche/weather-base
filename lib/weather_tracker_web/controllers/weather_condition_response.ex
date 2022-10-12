defmodule WeatherTrackerWeb.WeatherConditionsResponse do
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

  def from_weather_condition(wc) do
    %{
      timestamp: wc.timestamp,
      altitude_m: wc.altitude_m,
      pressure_pa: wc.pressure_pa,
      temperature_c: wc.temperature_c,
      humidity_rh: wc.humidity_rh,
      dew_point_c: wc.dew_point_c,
      gas_resistance_ohms: wc.gas_resistance_ohms,
      source: wc.source,
      iaq: 0
    }
  end
end
