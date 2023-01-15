defmodule WeatherTrackerForecast.WeatherForecast.PredictionRepository do
  @moduledoc """
  Describes the database interaction layer for the
  prediction entity
  """
  alias WeatherTracker.Repo

  alias WeatherTrackerForecast.WeatherForecast.PredictionModel

  def create_entry(attrs) do
    %PredictionModel{}
    |> PredictionModel.create_changeset(attrs)
    |> Repo.insert(
      on_conflict: [set: [snow_cm: attrs.snow_cm, rain_mm: attrs.rain_mm]],
      conflict_target: :timestamp
    )
  end

  def predictions_for_date_range(start_date, end_date) do
    Repo.execute_and_load(
      "select sum(snow_cm) snow_cm, sum(rain_mm) rain_mm, timestamp
      from predictions
      where timestamp > $1 and timestamp < $2
      and (snow_cm != 0.0 or rain_mm != 0.0)
      group by timestamp
      order by timestamp asc",
      [start_date, end_date],
      PredictionModel
    )
  end
end
