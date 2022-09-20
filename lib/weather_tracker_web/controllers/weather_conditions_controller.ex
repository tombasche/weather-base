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

  def get(conn, %{"hour" => hour}) do
    hour = String.to_integer(hour)
    weather_conditions = WeatherConditions.get_entries(hour)

    conn
    |> put_status(:ok)
    |> json(%{data: weather_conditions})
  end

  def get(conn, %{"day" => day}) do
    day = String.to_integer(day)
    weather_conditions = WeatherConditions.get_entries(0, day)

    conn
    |> put_status(:ok)
    |> json(%{data: weather_conditions})
  end

  def get(conn, %{"month" => month}) do
    month = String.to_integer(month)
    weather_conditions = WeatherConditions.get_entries(0, 0, month)

    conn
    |> put_status(:ok)
    |> json(%{data: weather_conditions})
  end

  def get(conn, %{}) do
    conn
    |> put_status(:bad_request)
    |> json(%{message: "Please specify either hour, day or month query params"})
  end
end
