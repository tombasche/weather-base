defmodule WeatherTrackerWeb.WeatherConditionsControllerTest do
  use WeatherTrackerWeb.ConnCase

  describe "create weather condition" do
    test "returns 201 when created" do
      weather_condition = %{
        altitude_m: "1000",
        pressure_pa: "998",
        temperature_c: "15",
        co2_eq_ppm: "400",
        tvoc_ppb: "0",
        light_lumens: "0"
      }

      conn = post(build_conn(), "/api/weather-conditions", weather_condition)

      body = conn |> json_response(201)

      assert %{
               "altitude_m" => "1000",
               "pressure_pa" => "998",
               "temperature_c" => "15",
               "co2_eq_ppm" => "400",
               "tvoc_ppb" => "0",
               "light_lumens" => "0"
             } = body
    end
  end
end
