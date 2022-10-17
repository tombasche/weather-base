defmodule WeatherTrackerWeb.WeatherConditionsGetAggregatedArgsTest do
  use WeatherTrackerWeb.ConnCase
  use Plug.Test

  test "source is a required param" do
    args = %{"start_date" => "2022-10-01", "end_date" => "2022-10-02"}
    result = args |> AggregateArgs.prepare() |> AggregateArgs.get()
    assert result == {:error, "source must be set"}
  end

  test "start_date is a required param" do
  end

  test "end_date is a required param" do
  end

  test "start_date must be a date" do
  end

  test "end_date must be a date" do
  end
end
