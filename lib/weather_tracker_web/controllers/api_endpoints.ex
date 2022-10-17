defmodule WeatherTrackerWeb.WeatherConditionsController do
  use WeatherTrackerWeb, :controller

  alias WeatherTracker.{
    WeatherConditions
  }

  alias WeatherTrackerWeb.WeatherConditionsResponse

  def get_latest(conn, _params) do
    conn = Plug.Conn.fetch_query_params(conn)

    case conn.query_params["source"] do
      nil ->
        conn |> put_status(400) |> json(%{error: "source must be set"})

      source ->
        wc = WeatherConditions.get_latest_for_source(source)
        conn |> json(WeatherConditionsResponse.from_weather_condition(wc))
    end
  end

  def get_aggregated(conn, _params) do
    conn = Plug.Conn.fetch_query_params(conn)

    args_parse_result =
      conn.query_params
      |> AggregateArgs.prepare()
      |> AggregateArgs.get()

    case args_parse_result do
      {:ok, _args} -> conn |> put_status(200) |> json(%{data: []})
      {:error, msg} -> conn |> put_status(400) |> json(%{error: msg})
    end
  end
end
