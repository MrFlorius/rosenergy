defmodule Rsoffers.Repo.Migrations.AddStuffToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :organisation, :string
      add :department, :string
      add :year_of_birth, :string
      add :job, :string
      add :education, :string
      add :expirience, :string
    end
  end
end
