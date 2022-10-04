defmodule WeatherTrackerWeb.WeatherConditionsController do
  use WeatherTrackerWeb, :controller

  require Logger

  alias WeatherTracker.{
    WeatherConditions,
    WeatherConditions.WeatherCondition
  }

  def get_latest(conn, params) do
    conn |> json(WeatherConditions.get_latest())
  end
end
