defmodule WeatherTrackerWeb.WeatherConditionsFormulasTest do
  use WeatherTrackerWeb.ConnCase
  use Plug.Test

  alias WeatherTracker.WeatherConditions.WeatherConditionFormulas

  test "feels like for higher temperatures" do
    temperature = 32
    relative_humidity = 85

    assert WeatherConditionFormulas.feels_like(temperature, relative_humidity) == 46
  end

  test "feels like for lower temperatures" do
    temperature = 11
    relative_humidity = 79

    assert WeatherConditionFormulas.feels_like(temperature, relative_humidity) == 10
  end

  test "celsius to fahrenheit" do
    assert WeatherConditionFormulas.celsius_to_fahrenheit(0) == 32.0
  end

  test "fahrenheit to celsius" do
    assert WeatherConditionFormulas.fahrenheit_to_celsius(100) == 38
  end
end
