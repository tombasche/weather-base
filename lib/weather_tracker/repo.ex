defmodule WeatherTracker.Repo do
  use Ecto.Repo,
    otp_app: :weather_tracker,
    adapter: Ecto.Adapters.Postgres

  def execute_and_load(sql, params, model) do
    result = query!(sql, params)
    Enum.map(result.rows, &load(model, {result.columns, &1}))
  end
end
