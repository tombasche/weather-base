defmodule AggregateArgs do
  @schema %{
    source: [type: :string, required: true],
    start_date: [type: :utc_datetime, required: true],
    end_date: [type: :utc_datetime, required: true]
  }
  def get(params) do
    Tarams.cast(params, @schema)
  end
end
