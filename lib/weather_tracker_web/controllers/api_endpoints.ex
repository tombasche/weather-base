defmodule WeatherTrackerWeb.WeatherConditionsController do
  use WeatherTrackerWeb, :controller

  alias WeatherTrackerForecast.PredictionSummaryService
  alias WeatherForecast.PredictionSummaryFromTest

  alias WeatherTracker.{
    WeatherConditions
  }

  alias WeatherTrackerWeb.WeatherConditionsResponse
  alias WeatherTrackerWeb.WeatherConditionAggregatedResponse

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
      |> AggregateArgs.get()

    case args_parse_result do
      {:ok, args} ->
        conn
        |> put_status(200)
        |> json(%{
          data:
            WeatherConditions.aggregate_for(args.source, args.start_date, args.end_date)
            |> Enum.map(&WeatherConditionAggregatedResponse.from_weather_condition/1)
        })

      {:error, msg} ->
        conn |> put_status(400) |> json(%{error: msg})
    end
  end

  def get_prediction_summary(conn, _params) do
    conn = Plug.Conn.fetch_query_params(conn)

    args_parse_result =
      conn.query_params
      |> StartEndArgs.get()

    case args_parse_result do
      {:ok, args} ->
        conn
        |> put_status(200)
        |> json(%{
          data: PredictionSummaryService.generate_summary_data(args.start_date, args.end_date)
        })

      {:error, msg} ->
        conn |> put_status(400) |> json(%{error: msg})
    end
  end
end
