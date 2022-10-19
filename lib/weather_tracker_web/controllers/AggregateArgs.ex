defmodule AggregateArgs do
  @schema %{
    source: [type: :string, required: true, length: [min: 1]],
    start_date: [type: :utc_datetime, required: true],
    end_date: [type: :utc_datetime, required: true]
  }
  def get(params) do
    Tarams.cast(params, @schema)
  end
end
