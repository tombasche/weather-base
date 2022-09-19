defmodule WeatherTrackerWeb.WeatherConditionsControllerGetTest do
  use WeatherTrackerWeb.ConnCase

  describe "get weather conditions" do
    test "last hour" do
      weather_condition = %{
        timestamp: NaiveDateTime.utc_now(),
        altitude_m: "1000",
        pressure_pa: "998",
        temperature_c: "15",
        co2_eq_ppm: "400",
        tvoc_ppb: "0",
        light_lumens: "0"
      }

      outside_last_hour = NaiveDateTime.add(NaiveDateTime.utc_now(), -7200, :second)

      outside_last_hour_weather_condition = %{
        weather_condition
        | timestamp: outside_last_hour
      }
    end
  end
end
