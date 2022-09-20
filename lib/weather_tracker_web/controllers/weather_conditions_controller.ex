defmodule WeatherTrackerWeb.WeatherConditionsController do
  use WeatherTrackerWeb, :controller

  require Logger

  alias WeatherTracker.{
    WeatherConditions,
    WeatherConditions.WeatherCondition
  }

  def create(conn, params) do
    case WeatherConditions.create_entry(params) do
      {:ok, weather_condition = %WeatherCondition{}} ->
        Logger.debug("Successfully created a weather condition entry")

        conn
        |> put_status(:created)
        |> json(weather_condition)

      error ->
        Logger.warn("Failed to create a weather entry: #{inspect(error)}")

        conn
        |> put_status(:unprocessable_entity)
        |> json(%{message: "Poorly formatted payload"})
    end
  end

  @spec get(Plug.Conn.t(), any) :: Plug.Conn.t()
  def get(conn, %{"hour" => hour}) do
    hour = String.to_integer(hour)
    weather_conditions = WeatherConditions.get_entries(hour, 0, 0, 0)

    conn
    |> put_status(:ok)
    |> json(%{data: weather_conditions})
  end
end
