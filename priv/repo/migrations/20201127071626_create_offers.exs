defmodule Rsoffers.Repo.Migrations.CreateOffers do
  use Ecto.Migration

  def change do
    create table(:offers) do
      add :name, :string
      add :description, :string
      add :solution, :string
      add :outcome, :string
      add :user_id, references(:users, on_delete: :nothing)
      add :status_id, references(:offer_status, on_delete: :nothing)

      timestamps()
    end

    create index(:offers, [:user_id])
    create index(:offers, [:status_id])
  end
end
