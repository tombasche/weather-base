defmodule WeatherTrackerForecast.PredictionService do
  def client, do: Application.get_env(:weather_tracker, :client)

  def get_prediction(start_date, end_date) do
    with {:ok, result} <- client().get_prediction(start_date, end_date) do
      {:ok, result}
    else
      err -> err
    end
  end
end
