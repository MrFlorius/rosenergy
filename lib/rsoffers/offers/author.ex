defmodule Rsoffers.Offers.Author do
  use Ecto.Schema
  import Ecto.Changeset

  schema "offer_authors" do
    field :precentage, :decimal

    belongs_to :offer, Rsoffers.Offers.Offer
    belongs_to :user, Rsoffers.Users.User

    timestamps()
  end

  @doc false
  def changeset(author, attrs) do
    author
    |> cast(attrs, [:precentage, :offer_id, :user_id])
    |> validate_required([:precentage, :offer_id, :user_id])
  end
end
