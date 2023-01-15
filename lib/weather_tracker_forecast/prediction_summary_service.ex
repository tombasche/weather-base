defmodule WeatherTrackerForecast.PredictionSummaryService do
  @moduledoc false
  alias WeatherTrackerForecast.ApiFormats.PredictionSummaryResponse
  alias WeatherTrackerForecast.WeatherForecast.PredictionRepository

  def generate_summary_data(start_date, end_date) do
    PredictionRepository.predictions_for_date_range(start_date, end_date)
    |> PredictionSummaryResponse.from_raw()
  end
end
