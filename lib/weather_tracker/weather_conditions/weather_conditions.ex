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

  def get_entries(hour \\ 0, day \\ 0, month \\ 0, year \\ 0) do
    now = NaiveDateTime.utc_now()

    case {hour, day, month, year} do
      {h, 0, 0, 0} ->
        all(
          from(e in WeatherCondition,
            where: e.timestamp > ^NaiveDateTime.add(now, h * -3600)
          )
        )

      {0, d, 0, 0} ->
        all(
          from(e in WeatherCondition,
            where: e.timestamp > ^NaiveDateTime.add(now, d * -86400)
          )
        )

      {0, 0, m, 0} ->
        all(
          from(e in WeatherCondition,
            where: e.timestamp > ^NaiveDateTime.add(now, m * -2_419_200)
          )
        )
    end
  end

  defp all(query) do
    Repo.all(query)
  end
end
