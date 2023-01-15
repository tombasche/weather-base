defmodule WeatherForecast.PredictionSummaryFromTest do
  use ExUnit.Case
  alias WeatherTrackerForecast.WeatherForecast.PredictionModel
  alias WeatherTrackerForecast.ApiFormats.PredictionSummaryResponse

  describe "conversion from db model to api model" do
    test "when rain and no snow" do
      result =
        [
          %PredictionModel{timestamp: ~N[2023-01-05 04:00:00.000], rain_mm: 1.0, snow_cm: 0.0},
          %PredictionModel{timestamp: ~N[2023-01-05 05:00:00.000], rain_mm: 0.8, snow_cm: 0.0},
          %PredictionModel{timestamp: ~N[2023-01-05 06:00:00.000], rain_mm: 0.2, snow_cm: 0.0}
        ]
        |> PredictionSummaryResponse.from_raw()

      assert result == %{
               rain: %{
                 amount: 2.00,
                 over: %{
                   time: 3,
                   unit: 'hours'
                 },
                 at: ~N[2023-01-05 04:00:00.000]
               },
               snow: %{
                 amount: 0.00,
                 over: %{
                   time: 3,
                   unit: 'hours'
                 },
                 at: ~N[2023-01-05 04:00:00.000]
               }
             }
    end

    test "when snow and no rain" do
      result =
        [
          %PredictionModel{timestamp: ~N[2023-01-05 04:00:00.000], rain_mm: 0.0, snow_cm: 1.0},
          %PredictionModel{timestamp: ~N[2023-01-05 05:00:00.000], rain_mm: 0.0, snow_cm: 0.8},
          %PredictionModel{timestamp: ~N[2023-01-05 06:00:00.000], rain_mm: 0.0, snow_cm: 0.1}
        ]
        |> PredictionSummaryResponse.from_raw()

      assert result == %{
               rain: %{
                 amount: 0.00,
                 over: %{
                   time: 3,
                   unit: 'hours'
                 },
                 at: ~N[2023-01-05 04:00:00.000]
               },
               snow: %{
                 amount: 1.90,
                 over: %{
                   time: 3,
                   unit: 'hours'
                 },
                 at: ~N[2023-01-05 04:00:00.000]
               }
             }
    end
  end
end
