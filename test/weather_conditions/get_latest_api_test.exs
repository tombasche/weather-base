defmodule WeatherTrackerWeb.WeatherConditionsGetLatestApiTest do
  use WeatherTrackerWeb.ConnCase
  use Plug.Test
  alias WeatherTracker.WeatherConditions

  alias WeatherTrackerWeb.Router

  @opts Router.init([])
  test "get latest entry for source" do
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

    conn = conn(:get, "/api/weather-conditions?source=outside")
    response = Router.call(conn, @opts)
    assert response.status == 200
  end

  test "source is a required param" do
    conn = conn(:get, "/api/weather-conditions")
    response = Router.call(conn, @opts)
    assert response.status == 400
  end

  defp create_new(attrs) do
    {:ok, result} = WeatherConditions.create_entry(attrs)
    result
  end
end
