defmodule WeatherTrackerWeb.Server do
  alias WeatherTracker.{
    WeatherConditions,
    WeatherConditions.WeatherCondition
  }

  @moduledoc false

  require Logger

  use GRPC.Server, service: WeatherConditionService.Service

  @spec create(atom | struct, any) :: struct
  def create(request, _stream) do
    case WeatherConditions.create_entry(Map.from_struct(request)) do
      {:ok, weather_condition = %WeatherCondition{}} ->
        Logger.debug("Successfully created a weather condition entry")

        WeatherConditionEventResponse.new(
          timestamp: DateTime.to_string(weather_condition.timestamp)
        )

      error ->
        Logger.warn("Failed to create a weather entry: #{inspect(error)}")

        WeatherConditionEventResponse.new(error: "Error saving entry due to #{inspect(error)}")
    end
  end
end
