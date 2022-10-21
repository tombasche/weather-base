defmodule WeatherTrackerWeb.WeatherConditionsGetTimeSeriesTest do
  use WeatherTrackerWeb.ConnCase

  alias WeatherTracker.WeatherConditions

  test "get aggregated temperature over time period" do
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

    result =
      WeatherConditions.aggregate_for(
        "outside",
        ~U[2022-10-03 00:00:00Z],
        ~U[2022-10-04 00:00:00Z]
      )

    assert length(result) == 24

    assert List.first(result).temperature_c != nil
  end

  defp create_new(attrs) do
    {:ok, result} = WeatherConditions.create_entry(attrs)
    result
  end

  defp generate_timestamp(minute) do
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
