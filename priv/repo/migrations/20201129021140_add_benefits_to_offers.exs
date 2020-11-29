defmodule Rsoffers.Repo.Migrations.AddBenefitsToOffers do
  use Ecto.Migration

  def change do
    alter table(:offers) do
      add :benefits, :string
    end
  end
end
