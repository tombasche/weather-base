defmodule WeatherTrackerWeb.WeatherConditionsController do
  use WeatherTrackerWeb, :controller

  alias WeatherTracker.{
    WeatherConditions
  }

  def get_latest(conn, _params) do
    conn = Plug.Conn.fetch_query_params(conn)
    source = conn.query_params["source"]
    conn |> json(WeatherConditions.get_latest_for_source(source))
  end
end
