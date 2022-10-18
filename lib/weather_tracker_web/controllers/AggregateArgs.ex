defmodule AggregateArgs do
  defstruct start_date: nil, source: nil, end_date: nil

  def prepare(raw_params) do
    query_params =
      for {key, val} <- raw_params, into: %{} do
        {String.to_atom(key), val}
      end

    struct(AggregateArgs, %{
      source: query_params[:source],
      start_date: string_to_datetime(query_params[:start_date]),
      end_date: string_to_datetime(query_params[:end_date])
    })
  end

  def get(%AggregateArgs{start_date: _, source: nil, end_date: _}) do
    {:error, "source must be set"}
  end

  def get(%AggregateArgs{start_date: nil, source: nil, end_date: nil}) do
    {:error, "start_date, source and end_date must be set"}
  end

  def get(args = %AggregateArgs{start_date: _, source: _, end_date: _}) do
    {:ok, args}
  end

  defp string_to_datetime(datetime_string) do
    result =
      case datetime_string do
        nil -> nil
        _ -> DateTime.from_iso8601(datetime_string)
      end

    case result do
      {:ok, val, _} -> val
      {:error, _} -> nil
    end
  end
end
