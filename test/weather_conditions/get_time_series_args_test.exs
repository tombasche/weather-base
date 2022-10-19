defmodule WeatherTrackerWeb.WeatherConditionsGetAggregatedArgsTest do
  use WeatherTrackerWeb.ConnCase
  use Plug.Test

  test "when all args are valid" do
    args = %{
      "start_date" => "2022-10-02T00:00:00Z",
      "source" => "outside",
      "end_date" => "2022-10-02T00:00:00Z"
    }

    {:ok, _} = args |> AggregateArgs.get()
  end

  test "source is a required param" do
    args = %{"start_date" => "2022-10-01T00:00:00Z", "end_date" => "2022-10-02T00:00:00Z"}
    result = args |> AggregateArgs.get()
    assert result == {:error, %{source: ["is required"]}}
  end

  test "start_date is a required param" do
    args = %{"source" => "outside", "end_date" => "2022-10-02T00:00:00Z"}
    result = args |> AggregateArgs.get()
    assert result == {:error, %{start_date: ["is required"]}}
  end

  test "end_date is a required param" do
    args = %{"source" => "outside", "start_date" => "2022-10-02T00:00:00Z"}
    result = args |> AggregateArgs.get()
    assert result == {:error, %{end_date: ["is required"]}}
  end

  test "start_date must be a date" do
    args = %{
      "start_date" => "dfsdfsdfsdfds",
      "source" => "outside",
      "end_date" => "2022-10-02T00:00:00Z"
    }

    result = args |> AggregateArgs.get()
    assert result == {:error, %{start_date: ["is in valid"]}}
  end

  test "end_date must be a date" do
    args = %{
      "start_date" => "2022-10-02T00:00:00Z",
      "source" => "outside",
      "end_date" => "dfsfsdfsdfsd"
    }

    result = args |> AggregateArgs.get()
    assert result == {:error, %{end_date: ["is in valid"]}}
  end
end
