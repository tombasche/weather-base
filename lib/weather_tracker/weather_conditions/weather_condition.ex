defmodule WeatherTracker.WeatherConditions.WeatherCondition do
  use Ecto.Schema
  import Ecto.Changeset

  @required_fields [
    :altitude_m,
    :pressure_pa,
    :temperature_c,
    :co2_eq_ppm,
    :tvoc_ppb,
    :light_lumens
  ]
  @derive {Jason.Encoder, only: @required_fields}
  @primary_key false
  schema "weather_conditions" do
    field :altitude_m, :decimal
    field :pressure_pa, :decimal
    field :temperature_c, :decimal
    field :co2_eq_ppm, :decimal
    field :tvoc_ppb, :decimal
    field :light_lumens, :decimal
    field :timestamp, :naive_datetime
  end

  def create_changeset(weather_condition, params \\ %{}) do
    timestamp =
      NaiveDateTime.utc_now()
      |> NaiveDateTime.truncate(:second)

    weather_condition
    |> cast(params, @required_fields)
    |> validate_required(@required_fields)
    |> put_change(:timestamp, timestamp)
  end
end
