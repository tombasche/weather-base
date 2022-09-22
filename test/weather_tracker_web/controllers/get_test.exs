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

      create_condition(%{
        weather_condition
        | timestamp: NaiveDateTime.add(now, -7200, :second)
      })

      create_condition(%{
        weather_condition
        | timestamp: NaiveDateTime.add(now, -3601, :second)
      })

      create_condition(weather_condition)

      conn = get(build_conn(), "/api/weather-conditions?hour=1")
      body = conn |> json_response(200)

      assert length(body["data"]) == 1
      result_time = first_entry_timestamp(body)
      assert result_time == NaiveDateTime.truncate(now, :second)
    end

    test "last day" do
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

      create_condition(%{
        weather_condition
        | timestamp: NaiveDateTime.add(now, -86_401, :second)
      })

      create_condition(%{
        weather_condition
        | timestamp: NaiveDateTime.add(now, -1_000_000, :second)
      })

      create_condition(weather_condition)

      conn = get(build_conn(), "/api/weather-conditions?day=1")
      body = conn |> json_response(200)

      assert length(body["data"]) == 1
      result_time = first_entry_timestamp(body)
      assert result_time == NaiveDateTime.truncate(now, :second)
    end

    test "last month" do
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

      create_condition(%{
        weather_condition
        | # 28 day month :shrug:
          timestamp: NaiveDateTime.add(now, -2_419_201, :second)
      })

      create_condition(%{
        weather_condition
        | timestamp: NaiveDateTime.add(now, -3_419_201, :second)
      })

      create_condition(weather_condition)

      conn = get(build_conn(), "/api/weather-conditions?month=1")
      body = conn |> json_response(200)

      assert length(body["data"]) == 1
      result_time = first_entry_timestamp(body)
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

  defp first_entry_timestamp(body) do
    NaiveDateTime.from_iso8601!(List.first(body["data"])["timestamp"])
  end
end
