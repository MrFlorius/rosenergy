defmodule Rsoffers.OfferStatus.Status do
  use Ecto.Schema
  import Ecto.Changeset

  schema "offer_status" do
    field :description, :string

    has_many :offers, Rsoffers.Offers.Offer

    timestamps()
  end

  @doc false
  def changeset(status, attrs) do
    status
    |> cast(attrs, [:description])
    |> validate_required([:description])
  end
end
