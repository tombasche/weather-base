defmodule WeatherTrackerForecast.PredictionService do
  def client, do: Application.get_env(:weather_tracker, :prediction_client)

  def get_prediction(start_date, end_date) do
    with {:ok, result} <- client().get_prediction(start_date, end_date) do
      result
    else
      err -> err
    end
  end
end
