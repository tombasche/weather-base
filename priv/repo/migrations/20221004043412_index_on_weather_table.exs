defmodule WeatherTracker.Repo.Migrations.IndexOnWeatherTable do
  use Ecto.Migration

  def change do
    execute("CREATE INDEX idx_weather_condition ON weather_conditions (timestamp DESC)")
  end
end
