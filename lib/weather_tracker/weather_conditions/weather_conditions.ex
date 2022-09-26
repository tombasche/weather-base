defmodule WeatherTracker.WeatherConditions do
  @moduledoc """
  Describes the database interaction layer for the
  weather condition entity
  """
  alias WeatherTracker.{
    Repo,
    WeatherConditions.WeatherCondition
  }

  def create_entry(attrs) do
    %WeatherCondition{}
    |> WeatherCondition.create_changeset(attrs)
    |> Repo.insert()
  end
end
