defmodule WeatherTrackerForecast.PredictionClientTest do
  use ExUnit.Case
  alias WeatherTrackerForecast.PredictionService
  import Mox

  describe "get prediction" do
    test "it gets prediction data when given start and end date" do
      PredictionClientBehaviourMock
      # TODO match this with what we should expect to save to the DB
      |> expect(:get_prediction, fn _start_date, _end_date -> {:ok, %{}} end)

      result = PredictionService.get_prediction("2022-01-01", "2022-01-02")
      assert {:ok, %{}} == result
    end
  end
end
