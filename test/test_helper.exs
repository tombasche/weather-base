Mox.defmock(PredictionClientBehaviourMock, for: WeatherTrackerForecast.PredictionClientBehaviour)

ExUnit.start()
Ecto.Adapters.SQL.Sandbox.mode(WeatherTracker.Repo, :manual)
