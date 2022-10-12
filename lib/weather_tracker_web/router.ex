defmodule WeatherTrackerWeb.Router do
  use WeatherTrackerWeb, :router

  pipeline :api do
    plug(CORSPlug)
    plug(:accepts, ["json"])
  end

  scope "/api", WeatherTrackerWeb do
    pipe_through(:api)

    get("/weather-conditions", WeatherConditionsController, :get_latest)
  end
end
