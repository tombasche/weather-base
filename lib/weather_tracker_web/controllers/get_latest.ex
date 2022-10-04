defmodule WeatherTrackerWeb.WeatherConditionsController do
  use WeatherTrackerWeb, :controller

  require Logger

  alias WeatherTracker.{
    WeatherConditions,
    WeatherConditions.WeatherCondition
  }

  def get_latest(conn, params) do
    result = WeatherConditions.get_latest()

    conn
    |> json(result)
  end
end
