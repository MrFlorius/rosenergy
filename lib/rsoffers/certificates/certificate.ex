defmodule Rsoffers.Certificates.Certificate do
  use Ecto.Schema
  import Ecto.Changeset

  schema "certificates" do
    belongs_to :user, Rsoffers.Users.User
    belongs_to :offer, Rsoffers.Offers.Offer
    belongs_to :status, Rsoffers.OfferStatus.Status

    timestamps()
  end

  @doc false
  def changeset(certificate, attrs) do
    certificate
    |> cast(attrs, [:user_id, :offer_id, :status_id])
    |> validate_required([:user_id, :offer_id, :status_id])
  end
end
