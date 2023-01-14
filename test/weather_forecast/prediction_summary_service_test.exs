defmodule WeatherTrackerForecast.PredictionSummaryServiceTest do
  use ExUnit.Case
  alias WeatherTrackerForecast.PredictionSummaryService

  describe "human readable summary" do
    test "when rain and no snow" do
      result =
        [
          %{timestamp: ~N[2023-01-05 04:00:00.000], rain_mm: 1.0, snow_cm: 0.0},
          %{timestamp: ~N[2023-01-05 05:00:00.000], rain_mm: 0.8, snow_cm: 0.0},
          %{timestamp: ~N[2023-01-05 06:00:00.000], rain_mm: 0.2, snow_cm: 0.0}
        ]
        |> PredictionSummaryService.summary()

      assert result == %{
               rain: %{
                 amount: 2.00,
                 over: %{
                   time: 3,
                   unit: 'hours'
                 }
               },
               snow: %{
                 amount: 0.00,
                 over: %{
                   time: 3,
                   unit: 'hours'
                 }
               }
             }
    end

    test "when snow and no rain" do
      result =
        [
          %{timestamp: ~N[2023-01-05 04:00:00.000], rain_mm: 0.0, snow_cm: 1.0},
          %{timestamp: ~N[2023-01-05 05:00:00.000], rain_mm: 0.0, snow_cm: 0.8},
          %{timestamp: ~N[2023-01-05 06:00:00.000], rain_mm: 0.0, snow_cm: 0.1}
        ]
        |> PredictionSummaryService.summary()

      assert result == %{
               rain: %{
                 amount: 0.00,
                 over: %{
                   time: 3,
                   unit: 'hours'
                 }
               },
               snow: %{
                 amount: 1.90,
                 over: %{
                   time: 3,
                   unit: 'hours'
                 }
               }
             }
    end
  end
end
