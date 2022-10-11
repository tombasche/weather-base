defmodule WeatherTrackerWeb.WeatherConditionsGetLatestTest do
  use WeatherTrackerWeb.ConnCase

  alias WeatherTracker.WeatherConditions

  test "get latest entry" do
    create_new(%{
      timestamp: ~U[2022-09-04 04:55:17Z],
      altitude_m: 0,
      pressure_pa: 10_000,
      temperature_c: 15,
      humidity_rh: 50,
      dew_point_c: 4,
      gas_resistance_ohms: 2000,
      source: "outside"
    })

    create_new(%{
      timestamp: ~U[2022-10-04 04:55:17Z],
      altitude_m: 0,
      pressure_pa: 10_000,
      temperature_c: 15,
      humidity_rh: 50,
      dew_point_c: 4,
      gas_resistance_ohms: 2000,
      source: "outside"
    })

    result = WeatherConditions.get_latest()
    assert result != nil
    assert result.timestamp == ~U[2022-10-04 04:55:17Z]
  end

  defp create_new(attrs) do
    {:ok, result} = WeatherConditions.create_entry(attrs)
    result
  end
end
