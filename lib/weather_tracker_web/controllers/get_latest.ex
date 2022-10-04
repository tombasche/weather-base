defmodule WeatherTrackerWeb.WeatherConditionsController do
  use WeatherTrackerWeb, :controller

  alias WeatherTracker.{
    WeatherConditions
  }

  def get_latest(conn, _params) do
    conn |> json(WeatherConditions.get_latest())
  end
end
