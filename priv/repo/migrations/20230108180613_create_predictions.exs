defmodule WeatherTracker.Repo.Migrations.CreatePredictions do
  use Ecto.Migration

  def change do
    create table(:predictions, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :timestamp, :naive_datetime
      add :snow_cm, :float
      add :rain_mm, :float

      timestamps()
    end
  end
end
