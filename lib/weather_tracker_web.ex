defmodule WeatherTrackerWeb do
  @moduledoc false
  def controller do
    quote do
      use Phoenix.Controller, namespace: WeatherTrackerWeb

      import Plug.Conn
      alias WeatherTrackerWeb.Router.Helpers, as: Routes
    end
  end

  def router do
    quote do
      use Phoenix.Router

      import Plug.Conn
      import Phoenix.Controller
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
