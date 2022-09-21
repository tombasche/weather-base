FROM elixir:latest

EXPOSE 4000

RUN apt-get update && \
    apt-get install -y postgresql-client && \
    mix local.hex --force && \
    mix archive.install hex phx_new --force && \
    mix local.rebar --force

ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
