defmodule WeatherTracker.WeatherConditions.WeatherConditionFormulas do
  @moduledoc """
  Formulas used for meteorological calculations
  """

  def celsius_to_fahrenheit(temp) do
    temp * 1.8 + 32
  end

  def fahrenheit_to_celsius(temp) do
    ((temp - 32) / 1.8) |> Kernel.round()
  end

  defp rothfusz_regression(temp_f, relative_humidity) do
    -42.379 +
      2.049 * temp_f +
      10.1433 * relative_humidity -
      0.2248 * temp_f * relative_humidity -
      0.0068378 * :math.pow(temp_f, 2) -
      0.05481717 * :math.pow(relative_humidity, 2) +
      0.00122874 * :math.pow(temp_f, 2) * relative_humidity +
      0.00085282 * temp_f * :math.pow(relative_humidity, 2) -
      0.00000199 * :math.pow(temp_f, 2) * :math.pow(relative_humidity, 2)
  end

  defp steadman(temp_f, relative_humidity) do
    0.5 * (temp_f + 61 + (temp_f - 68) * 1.2 + relative_humidity * 0.094) - 5
  end

  def feels_like(temperature, relative_humidity) do
    temp_f = temperature |> celsius_to_fahrenheit()

    case temp_f do
      temp_f when temp_f >= 80 -> rothfusz_regression(temp_f, relative_humidity)
      _ -> steadman(temp_f, relative_humidity)
    end
    |> fahrenheit_to_celsius()
  end
end
