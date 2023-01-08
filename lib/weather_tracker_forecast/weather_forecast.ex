defmodule WeatherTrackerForecast.WeatherForecast.PredictionModel do
  @moduledoc false
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "predictions" do
    field :rain_mm, :float
    field :snow_cm, :float
    field :timestamp, :naive_datetime

    timestamps()
  end

  @doc false
  def create_changeset(prediction, attrs) do
    prediction
    |> cast(attrs, [:timestamp, :snow_cm, :rain_mm])
    |> validate_required([:timestamp, :snow_cm, :rain_mm])
  end
end
