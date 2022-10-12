defmodule WeatherTrackerWeb.WeatherConditionsController do
  use WeatherTrackerWeb, :controller

  alias WeatherTracker.{
    WeatherConditions
  }

  def get_latest(conn, _params) do
    conn = Plug.Conn.fetch_query_params(conn)

    case conn.query_params["source"] do
      nil -> conn |> put_status(400) |> json(%{error: "source must be set"})
      source -> conn |> json(WeatherConditions.get_latest_for_source(source))
    end
  end
end
