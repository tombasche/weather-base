defmodule WeatherTrackerWeb do
  def view do
    quote do
    end
  end

  @spec __using__(atom) :: any
  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
