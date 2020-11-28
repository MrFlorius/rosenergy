defmodule Rsoffers.Repo.Migrations.CreateOfferAuthors do
  use Ecto.Migration

  def change do
    create table(:offer_authors) do
      add :precentage, :decimal
      add :offer_id, references(:offers, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:offer_authors, [:offer_id])
    create index(:offer_authors, [:user_id])
  end
end
