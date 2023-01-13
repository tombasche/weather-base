defmodule WeatherForecast.ForecastJobServiceTest do
  use WeatherTrackerWeb.ConnCase
  import Mox

  alias WeatherTrackerForecast.ForecastJobService

  setup :verify_on_exit!

  test "fetches for a today and a day in advance" do
    PredictionClientBehaviourMock
    |> expect(:get_predictions, fn _start_date, _end_date ->
      {:ok,
       %{
         "latitude" => 60.16998,
         "longitude" => 24.94519,
         "generationtime_ms" => 8.794903755187988,
         "utc_offset_seconds" => 7200,
         "timezone" => "Europe/Helsinki",
         "timezone_abbreviation" => "EET",
         "elevation" => 7.0,
         "hourly_units" => %{"time" => "iso8601", "snowfall" => "cm", "rain" => "mm"},
         "hourly" => %{
           "time" => [
             "2023-01-05T00:00",
             "2023-01-05T01:00",
             "2023-01-05T02:00"
           ],
           "snowfall" => [
             2.0,
             1.0,
             3.0
           ],
           "rain" => [
             1.0,
             0.0,
             2.0
           ]
         }
       }}
    end)

    job = ForecastJobService.fetch(&fetch_date/0)
  end

  def fetch_date do
    case DateTime.from_iso8601("2023-01-01T15:00:00.000Z") do
      {:ok, result, _} -> result
      {:error, error} -> error
    end
  end
end
