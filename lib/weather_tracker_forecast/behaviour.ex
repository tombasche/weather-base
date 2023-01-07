defmodule WeatherTrackerForecast.PredictionClientBehaviour do
  @moduledoc false

  @callback get_prediction(String.t(), String.t()) :: tuple()
end
