defmodule WeatherConditionEvent do
  @moduledoc false
  use Protobuf, protoc_gen_elixir_version: "0.11.0", syntax: :proto3

  field :timestamp, 1, type: :string
  field :altitude_m, 2, type: :float, json_name: "altitudeM"
  field :pressure_pa, 3, type: :float, json_name: "pressurePa"
  field :temperature_c, 4, type: :float, json_name: "temperatureC"
  field :humidity_rh, 5, type: :float, json_name: "humidityRh"
  field :dew_point_c, 6, type: :float, json_name: "dewPointC"
  field :gas_resistance_ohms, 7, type: :float, json_name: "gasResistanceOhms"
end

defmodule WeatherConditionEventResponse do
  @moduledoc false
  use Protobuf, protoc_gen_elixir_version: "0.11.0", syntax: :proto3

  field :timestamp, 1, type: :string
  field :error, 2, type: :string
end

defmodule WeatherConditionService.Service do
  @moduledoc false
  use GRPC.Service, name: "WeatherConditionService", protoc_gen_elixir_version: "0.11.0"

  rpc :Create, WeatherConditionEvent, WeatherConditionEventResponse
end

defmodule WeatherConditionService.Stub do
  @moduledoc false
  use GRPC.Stub, service: WeatherConditionService.Service
end