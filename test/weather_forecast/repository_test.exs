defmodule WeatherTrackerForecast.WeatherForecast.PredictionRepositoryTest do
  use WeatherTrackerWeb.ConnCase

  alias WeatherTrackerForecast.WeatherForecast.PredictionRepository

  test "test saving with ecto model" do
    create_new(%{
      timestamp: ~U[2022-10-03 00:00:00Z],
      snow_cm: 1.0,
      rain_mm: 1.0
    })
  end

  defp create_new(attrs) do
    {:ok, result} = PredictionRepository.create_entry(attrs)
    result
  end
end
