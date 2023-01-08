defmodule WeatherTrackerForecast.PredictionApiFormatTest do
  use WeatherTrackerWeb.ConnCase
  use Plug.Test

  test "get predictions for timestamps" do
    raw_data = %{
      latitude: 60.16998,
      longitude: 24.94519,
      generationtime_ms: 8.794903755187988,
      utc_offset_seconds: 7200,
      timezone: "Europe/Helsinki",
      timezone_abbreviation: "EET",
      elevation: 7.0,
      hourly_units: %{time: "iso8601", snowfall: "cm", rain: "mm"},
      hourly: %{
        time: [
          "2023-01-05T00:00",
          "2023-01-05T01:00",
          "2023-01-05T02:00"
        ],
        snowfall: [
          2.0,
          1.0,
          3.0
        ],
        rain: [
          1.0,
          0.0,
          2.0
        ]
      }
    }

    result = WeatherTrackerForecast.Prediction.from_api_response(raw_data)

    expected_response = [
      %{
        timestamp: ~N[2023-01-05 00:00:00.000],
        snow_cm: 2.0,
        rain_mm: 1.0
      },
      %{
        timestamp: ~N[2023-01-05 01:00:00.000],
        snow_cm: 1.0,
        rain_mm: 0.0
      },
      %{
        timestamp: ~N[2023-01-05 02:00:00.000],
        snow_cm: 3.0,
        rain_mm: 2.0
      }
    ]

    assert result == expected_response
  end

  test "handles invalid timestamp" do
    raw_data = %{
      hourly: %{
        time: [
          "some-invalid-timestamp"
        ],
        snowfall: [1],
        rain: [0]
      }
    }

    result = WeatherTrackerForecast.Prediction.from_api_response(raw_data)
    assert result == []
  end
end
