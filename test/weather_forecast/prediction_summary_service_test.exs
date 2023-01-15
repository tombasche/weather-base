defmodule WeatherTrackerForecast.PredictionSummaryServiceTest do
  use ExUnit.Case
  use WeatherTrackerWeb.ConnCase

  alias WeatherTrackerForecast.WeatherForecast.PredictionRepository
  alias WeatherTrackerForecast.PredictionSummaryService

  describe "converts raw data into summary" do
    test "single 'clump' of rain data" do
      raw_data =
        [
          %{timestamp: ~N[2023-01-05 00:00:00.000], rain_mm: 0.0, snow_cm: 0.0},
          %{timestamp: ~N[2023-01-05 01:00:00.000], rain_mm: 0.0, snow_cm: 0.0},
          %{timestamp: ~N[2023-01-05 02:00:00.000], rain_mm: 0.0, snow_cm: 0.0},
          %{timestamp: ~N[2023-01-05 03:00:00.000], rain_mm: 0.0, snow_cm: 0.0},
          %{timestamp: ~N[2023-01-05 04:00:00.000], rain_mm: 1.0, snow_cm: 0.0},
          %{timestamp: ~N[2023-01-05 05:00:00.000], rain_mm: 0.8, snow_cm: 0.0},
          %{timestamp: ~N[2023-01-05 06:00:00.000], rain_mm: 0.2, snow_cm: 0.0},
          %{timestamp: ~N[2023-01-05 07:00:00.000], rain_mm: 0.0, snow_cm: 0.0},
          %{timestamp: ~N[2023-01-05 08:00:00.000], rain_mm: 0.0, snow_cm: 0.0},
          %{timestamp: ~N[2023-01-05 09:00:00.000], rain_mm: 0.0, snow_cm: 0.0}
        ]
        |> Enum.each(&PredictionRepository.create_entry/1)

      start_date = ~N[2023-01-05 00:00:00.000]
      end_date = ~N[2023-01-06 00:00:00.000]
      result = PredictionSummaryService.generate_summary_data(start_date, end_date)

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
                 }
               }
             }
    end
  end

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
