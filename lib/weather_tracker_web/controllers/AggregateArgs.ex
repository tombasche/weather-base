defmodule AggregateArgs do
  defstruct start_date: nil, source: nil, end_date: nil

  def prepare(raw_params) do
    query_params = for {key, val} <- raw_params, into: %{}, do: {String.to_atom(key), val}
    struct(AggregateArgs, query_params)
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
end
