defmodule WeatherTrackerForecast.PredictionClient do
  @moduledoc false

  @behaviour WeatherTrackerForecast.PredictionClientBehaviour

  use HTTPoison.Base

  import Poison, only: [decode!: 1]

  defp latitude, do: 60.17
  defp longitude, do: 24.94

  defp base_url, do: "https://api.open-meteo.com"

  def get_predictions(start_date, end_date) do
    url(start_date, end_date)
    |> do_get()
  end

  defp do_get(url) do
    case get(url) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, decode!(body)}

      {:error, %HTTPoison.Error{reason: reason}} ->
        {:error, reason}
    end
  end

  defp url(start_date, end_date) do
    "#{base_url()}/v1/forecast?latitude=#{latitude()}&longitude=#{longitude()}&hourly=snowfall,rain&start_date=#{start_date}&end_date=#{end_date}"
  end
end
