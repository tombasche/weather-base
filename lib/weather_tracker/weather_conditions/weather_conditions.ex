defmodule WeatherTracker.WeatherConditions do
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

  def get_entries(hour, _day, _month, _year) do
    now = NaiveDateTime.utc_now()

    query =
      from e in WeatherCondition,
        where: e.timestamp > ^NaiveDateTime.add(now, hour * -3600)

    IO.inspect(query)
    Repo.all(query)
  end
end
