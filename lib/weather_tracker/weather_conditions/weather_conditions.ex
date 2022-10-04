defmodule WeatherTracker.WeatherConditions do
  @moduledoc """
  Describes the database interaction layer for the
  weather condition entity
  """
  alias WeatherTracker.{
    Repo,
    WeatherConditions.WeatherCondition
  }

  import Ecto.Query, only: [from: 2]

  def create_entry(attrs) do
    %WeatherCondition{}
    |> WeatherCondition.create_changeset(attrs)
    |> Repo.insert()
  end

  def get_latest() do
    Repo.one(from wc in WeatherCondition, order_by: [desc: wc.timestamp], limit: 1)
  end
end
