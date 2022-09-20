defmodule WeatherTrackerWeb.WeatherConditionsControllerGetTest do
  use WeatherTrackerWeb.ConnCase

  alias WeatherTracker.WeatherConditions

  describe "get weather conditions" do
    test "last hour" do
      now = NaiveDateTime.utc_now()

      weather_condition = %{
        timestamp: now,
        altitude_m: "400",
        pressure_pa: "998",
        temperature_c: "15",
        co2_eq_ppm: "400",
        tvoc_ppb: "0",
        light_lumens: "0"
      }

      outside_last_hour = NaiveDateTime.add(now, -7200, :second)

      create_condition(%{
        weather_condition
        | timestamp: outside_last_hour
      })

      create_condition(weather_condition)

      conn = get(build_conn(), "/api/weather-conditions?hour=1")
      body = conn |> json_response(200)

      assert length(body["data"]) == 1
      result_time = NaiveDateTime.from_iso8601!(List.first(body["data"])["timestamp"])
      assert result_time == NaiveDateTime.truncate(now, :second)
    end

    test "no args passed returns a 400" do
      conn = get(build_conn(), "/api/weather-conditions")
      assert conn.status == 400
    end
  end

  defp create_condition(attrs) do
    {:ok, result} = WeatherConditions.create_entry(attrs)
    result
  end
end
