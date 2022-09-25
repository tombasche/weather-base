# WeatherTracker

The server portion of the home weather tracking.

## Development

Use `docker compose up -d` to start everything or `docker compose up -d db` for just Postgres

## TODO

- gRPC for create method
- A 'latest' endpoint which gets the last entry in the db which returns the top row

  - Could this use websockets? also with gRPC? (it'd be the same pb as the create endpoint!)

- Build a UI on top of the latest endpoint to display these things
  - I think I'll just run a separate UI on top which uses HTTP -> HTTP is smart enough to not hop out of the local network if it doesn't have to. Much easier than trying to cram reactive JS on top of Phoenix.
