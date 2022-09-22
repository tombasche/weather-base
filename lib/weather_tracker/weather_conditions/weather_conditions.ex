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

  @seconds_in_hour 3600
  @seconds_in_day 86_400
  @seconds_in_28_days 2_419_200

  def create_entry(attrs) do
    %WeatherCondition{}
    |> WeatherCondition.create_changeset(attrs)
    |> Repo.insert()
  end

  def get_entries(hour \\ 0, day \\ 0, month \\ 0) do
    period =
      case {hour, day, month} do
        {h, 0, 0} -> h * -@seconds_in_hour
        {0, d, 0} -> d * -@seconds_in_day
        {0, 0, m} -> m * -@seconds_in_28_days
      end

    Repo.all(
      from(e in WeatherCondition,
        where: e.timestamp > ^NaiveDateTime.add(NaiveDateTime.utc_now(), period)
      )
    )
  end
end
