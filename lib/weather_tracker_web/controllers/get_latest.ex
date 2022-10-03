defmodule WeatherTrackerWeb.WeatherConditionsController do
  use WeatherTrackerWeb, :controller

  require Logger

  # alias WeatherTracker.{
  #   WeatherConditions,
  #   WeatherConditions.WeatherCondition
  # }

  def get_latest(conn, params) do
    IO.inspect(params)

    conn
    |> json(%{id: 1, temperature_c: 15})
  end
end
