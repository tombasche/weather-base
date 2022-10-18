defmodule WeatherTrackerWeb.WeatherConditionsGetAggregatedApiTest do
  use WeatherTrackerWeb.ConnCase
  use Plug.Test
  alias WeatherTracker.WeatherConditions

  alias WeatherTrackerWeb.Router

  @opts Router.init([])
  test "get time series data by source within a date range" do
    conn =
      conn(
        :get,
        "/api/weather-conditions-aggregated?source=outside&start_date=2022-10-01T00:00:00Z&end_date=2022-10-11T00:00:00Z"
      )

    response = Router.call(conn, @opts)
    assert response.status == 200
  end

  # test "source is a required param" do
  #   conn = conn(:get, "/api/weather-conditions-aggregated")
  #   response = Router.call(conn, @opts)
  #   assert response.status == 400
  # end

  # test "start_date is a required param" do
  #   conn = conn(:get, "/api/weather-conditions-aggregated?source=outside")
  #   response = Router.call(conn, @opts)
  #   assert response.status == 400
  # end

  # test "end_date is a required param" do
  #   conn = conn(:get, "/api/weather-conditions-aggregated?source=outside&start_date=2022-10-01")
  #   response = Router.call(conn, @opts)
  #   assert response.status == 400
  # end

  # test "start_date must be a valid date" do
  #   conn =
  #     conn(
  #       :get,
  #       "/api/weather-conditions-aggregated?source=outside&start_date=some-other-thing&end_date=2022-10-11"
  #     )

  #   response = Router.call(conn, @opts)
  #   assert response.status == 400
  # end

  # test "end_date must be a valid date" do
  #   conn =
  #     conn(
  #       :get,
  #       "/api/weather-conditions-aggregated?source=outside&start_date=2022-10-11&end_date=whatever"
  #     )

  #   response = Router.call(conn, @opts)
  #   assert response.status == 400
  # end

  defp create_new(attrs) do
    {:ok, result} = WeatherConditions.create_entry(attrs)
    result
  end
end
