defmodule Rsoffers.Repo.Migrations.CreateOfferStatus do
  use Ecto.Migration

  def change do
    create table(:offer_status) do
      add :description, :string

      timestamps()
    end

  end
end
