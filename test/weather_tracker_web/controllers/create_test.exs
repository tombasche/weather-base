defmodule WeatherTrackerWeb.WeatherConditionsControllerCreateTest do
  use WeatherTrackerWeb.ConnCase

  describe "create weather condition" do
    test "returns 201 when created" do
      now = NaiveDateTime.utc_now()

      weather_condition = %{
        timestamp: now,
        altitude_m: "1000",
        pressure_pa: "998",
        temperature_c: "15",
        gas_resistance_ohms: "3000"
      }

      conn = post(build_conn(), "/api/weather-conditions", weather_condition)

      body = conn |> json_response(201)

      assert %{
               "altitude_m" => "1000",
               "pressure_pa" => "998",
               "temperature_c" => "15",
               "gas_resistance_ohms" => "3000"
             } = body
    end
  end
end
