# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :rsoffers,
  ecto_repos: [Rsoffers.Repo]

config :rsoffers, :pow,
  user: Rsoffers.Users.User,
  repo: Rsoffers.Repo,
  web_module: RsoffersWeb

config :pow, Pow.Ecto.Schema.Password, password_min_length: 4

# Configures the endpoint
config :rsoffers, RsoffersWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "y3Ej/8pjgSyUC5DRlf0ePZbmhuRKNeJU0JGCtzpvQATpktNigAoPhdVEWkUNEP9w",
  render_errors: [view: RsoffersWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Rsoffers.PubSub,
  live_view: [signing_salt: "LCntjzB4"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
