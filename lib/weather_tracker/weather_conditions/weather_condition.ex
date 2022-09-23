defmodule WeatherTracker.WeatherConditions.WeatherCondition do
  @moduledoc """
  Describes the database schema for the weather condition entity
  """
  use Ecto.Schema
  import Ecto.Changeset

  @required_fields [
    :timestamp,
    :altitude_m,
    :pressure_pa,
    :temperature_c,
    :humidity_rh,
    :dew_point_c,
    :gas_resistance_ohms
  ]
  @derive {Jason.Encoder, only: @required_fields}
  @primary_key false
  schema "weather_conditions" do
    field :timestamp, :naive_datetime
    field :altitude_m, :decimal
    field :pressure_pa, :decimal
    field :temperature_c, :decimal
    field :humidity_rh, :decimal
    field :dew_point_c, :decimal
    field :gas_resistance_ohms, :decimal
  end

  def create_changeset(weather_condition, params \\ %{}) do
    weather_condition
    |> cast(params, @required_fields)
    |> validate_required(@required_fields)
  end
end
