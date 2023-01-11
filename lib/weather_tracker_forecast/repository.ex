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
end
