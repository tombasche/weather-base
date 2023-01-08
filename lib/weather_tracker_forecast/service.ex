defmodule WeatherTrackerForecast.PredictionService do
  @moduledoc false

  alias WeatherTrackerForecast.Prediction
  def client, do: Application.get_env(:weather_tracker, :client)

  def get_prediction(start_date, end_date) do
    case client().get_prediction(start_date, end_date) do
      {:ok, result} -> {:ok, Prediction.from_api_response(result)}
      {:error, err} -> err
    end
  end
end
