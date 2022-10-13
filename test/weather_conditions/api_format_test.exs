defmodule WeatherTrackerWeb.WeatherConditionsApiFormatTest do
  use WeatherTrackerWeb.ConnCase
  use Plug.Test

  test "get latest entry for source" do
    raw_data = %{
      timestamp: ~U[2022-09-04 04:55:17Z],
      altitude_m: Decimal.new(0),
      pressure_pa: Decimal.new(10_000),
      temperature_c: Decimal.from_float(15.12312312312),
      humidity_rh: Decimal.from_float(80.27123132123),
      dew_point_c: Decimal.new(4),
      gas_resistance_ohms: Decimal.new(2000),
      source: "outside"
    }

    api_response = WeatherTrackerWeb.WeatherConditionsResponse.from_weather_condition(raw_data)

    expected_response = %{
      timestamp: ~U[2022-09-04 04:55:17Z],
      temperature_c: 15,
      feels_like_c: 12,
      humidity_rh: 80,
      iaq: 11
    }

    assert api_response == expected_response
  end
end
