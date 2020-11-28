defmodule Rsoffers.Repo do
  use Ecto.Repo,
    otp_app: :rsoffers,
    adapter: Ecto.Adapters.Postgres
end
