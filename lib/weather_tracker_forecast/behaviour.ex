defmodule WeatherTrackerForecast.PredictionClientBehaviour do
  @moduledoc false

  @callback get_predictions(String.t(), String.t()) :: tuple()
end
