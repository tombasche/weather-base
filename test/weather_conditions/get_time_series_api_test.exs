defmodule WeatherTrackerWeb.WeatherConditionsGetAggregatedApiTest do
  use WeatherTrackerWeb.ConnCase
  use Plug.Test
  alias WeatherTracker.WeatherConditions

  alias WeatherTrackerWeb.Router

  @opts Router.init([])
  test "get time series data by source within a date range" do
    for n <- 1..1440,
        do:
          create_new(%{
            timestamp: generate_timestamp(n),
            altitude_m: 0,
            pressure_pa: 10_000,
            temperature_c: 15,
            humidity_rh: 50,
            dew_point_c: 4,
            gas_resistance_ohms: 2000,
            source: "outside"
          })

    conn =
      conn(
        :get,
        "/api/weather-conditions-aggregated?source=outside&start_date=2022-10-01T00:00:00Z&end_date=2022-10-11T00:00:00Z"
      )

    conn = Router.call(conn, @opts)
    assert conn.status == 200
    result = json_response(conn, 200)["data"]
    assert length(result) == 24
  end

  defp create_new(attrs) do
    {:ok, result} = WeatherConditions.create_entry(attrs)
    result
  end

  def generate_timestamp(minute) do
    date = %{
      year: 2022,
      month: 10,
      day: 3,
      hour: round(24 - minute / 60) |> clamp_hour(),
      minute: (60 - rem(minute, 60)) |> clamp_minute(),
      second: 0,
      utc_offset: 0
    }

    date
  end

  defp clamp_hour(_hour = 24) do
    0
  end

  defp clamp_hour(hour) do
    hour
  end

  defp clamp_minute(_minute = 60) do
    0
  end

  defp clamp_minute(minute) do
    minute
  end
end
