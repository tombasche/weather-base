defmodule WeatherForecast.PredictionApiTest do
  use WeatherTrackerWeb.ConnCase
  use Plug.Test
  alias WeatherTrackerForecast.WeatherForecast.PredictionRepository

  alias WeatherTrackerWeb.Router

  @opts Router.init([])
  test "get prediction summary for a date range" do
    for n <- 1..48,
        do:
          create_new(%{
            timestamp: generate_timestamp(n),
            snow_cm: 0,
            rain_mm: 1.0
          })

    conn =
      conn(
        :get,
        "/api/prediction-summary?start_date=2022-10-01T00:00:00Z&end_date=2022-10-11T00:00:00Z"
      )

    conn = Router.call(conn, @opts)
    assert conn.status == 200
    result = json_response(conn, 200)["data"]

    assert result == %{
             "rain" => %{
               "amount" => 48.0,
               "at" => "2022-10-03T00:30:00",
               "over" => %{"time" => 48, "unit" => "hours"}
             },
             "snow" => %{
               "amount" => 0.0,
               "at" => "2022-10-03T00:30:00",
               "over" => %{"time" => 48, "unit" => "hours"}
             }
           }
  end

  test "start_date and end_date are required" do
    conn = conn(:get, "/api/prediction-summary")
    response = Router.call(conn, @opts)
    assert response.status == 400
  end

  test "start_date is required" do
    conn = conn(:get, "/api/prediction-summary?end_date=2022-10-11T00:00:00Z")
    response = Router.call(conn, @opts)
    assert response.status == 400
  end

  test "end_date is required" do
    conn = conn(:get, "/api/prediction-summary?start_date=2022-10-11T00:00:00Z")
    response = Router.call(conn, @opts)
    assert response.status == 400
  end

  test "both dates must be valid iso8601 format" do
    conn = conn(:get, "/api/prediction-summary?start_date=blah&end_date=bloo")
    response = Router.call(conn, @opts)
    assert response.status == 400
  end

  defp create_new(attrs) do
    {:ok, result} = PredictionRepository.create_entry(attrs)
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
