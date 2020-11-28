defmodule Rsoffers.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :first_name, :string, null: false
      add :last_name,  :string, null: false

      add :email, :string, null: false
      add :password_hash, :string

      add :group_id, references(:groups, on_delete: :nothing)

      timestamps()
    end

    create index(:users, [:group_id])
    create unique_index(:users, [:email])
  end
end
