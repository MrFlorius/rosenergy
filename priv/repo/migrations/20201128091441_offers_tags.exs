defmodule Rsoffers.Repo.Migrations.OffersTags do
  use Ecto.Migration

  def change do
    create table(:offers_tags) do
      add :offer_id, references(:offers, on_delete: :delete_all)
      add :tag_id,   references(:tags, on_delete: :delete_all)
    end

    create index(:offers_tags, [:offer_id])
    create index(:offers_tags, [:tag_id])
  end
end
