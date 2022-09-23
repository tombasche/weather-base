defmodule WeatherTrackerWeb.WeatherConditionsControllerCreateTest do
  use WeatherTrackerWeb.ConnCase

  describe "create weather condition" do
    test "returns 201 when created" do
      weather_condition = %{
        timestamp: ~N[2015-10-03 12:00:00.000000],
        altitude_m: "1000",
        pressure_pa: "998",
        temperature_c: "15",
        dew_point_c: "2",
        humidity_rh: "34",
        gas_resistance_ohms: "3000"
      }

      conn = post(build_conn(), "/api/weather-conditions", weather_condition)

      body = conn |> json_response(201)

      assert %{
               "timestamp" => "2015-10-03T12:00:00",
               "altitude_m" => "1000",
               "pressure_pa" => "998",
               "temperature_c" => "15",
               "dew_point_c" => "2",
               "humidity_rh" => "34",
               "gas_resistance_ohms" => "3000"
             } = body
    end
  end
end
