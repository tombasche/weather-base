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

  def get_latest_for_source(source) do
    Repo.one(
      from wc in WeatherCondition,
        where: wc.source == ^source,
        order_by: [desc: wc.timestamp],
        limit: 1
    )
  end

  def aggregate_for(source, start_date, end_date) do
    Repo.execute_and_load(
      "select avg(temperature_c) temperature_c, date_trunc('hour', timestamp) timestamp
      from weather_conditions
      where source = $1 and timestamp > $2 and timestamp < $3
      group by date_trunc('hour', timestamp)",
      [source, start_date, end_date],
      WeatherCondition
    )
  end
end
