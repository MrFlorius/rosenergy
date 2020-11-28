defmodule Rsoffers.Repo.Migrations.CreateCertificates do
  use Ecto.Migration

  def change do
    create table(:certificates) do
      add :user_id, references(:users, on_delete: :nothing)
      add :offer_id, references(:offers, on_delete: :nothing)
      add :status_id, references(:offer_status, on_delete: :nothing)

      timestamps()
    end

    create index(:certificates, [:user_id])
    create index(:certificates, [:offer_id])
    create index(:certificates, [:status_id])
  end
end
