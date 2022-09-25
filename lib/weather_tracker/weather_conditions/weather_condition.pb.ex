defmodule WeatherCondition do
  @moduledoc false
  use Protobuf, protoc_gen_elixir_version: "0.11.0", syntax: :proto3

  field :timestamp, 1, type: :string
  field :altitude_m, 2, type: :string, json_name: "altitudeM"
  field :pressure_pa, 3, type: :string, json_name: "pressurePa"
  field :temperature_c, 4, type: :string, json_name: "temperatureC"
  field :humidity_rh, 5, type: :string, json_name: "humidityRh"
  field :dew_point_c, 6, type: :string, json_name: "dewPointC"
  field :gas_resistance_ohms, 7, type: :string, json_name: "gasResistanceOhms"
end