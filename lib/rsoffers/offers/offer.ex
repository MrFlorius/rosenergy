defmodule Rsoffers.Offers.Offer do
  use Ecto.Schema
  import Ecto.Changeset

  schema "offers" do
    field :description, :string
    field :name, :string
    field :outcome, :string
    field :benefits, :string
    field :solution, :string

    belongs_to :user, Rsoffers.Users.User
    belongs_to :status, Rsoffers.OfferStatus.Status

    has_many :authors, Rsoffers.Offers.Author
    many_to_many :tags, Rsoffers.Tags.Tag, join_through: "offers_tags", on_replace: :delete

    timestamps()
  end

  @doc false
  def changeset(offer, attrs) do

    offer
    |> cast(attrs, [:name, :description, :solution, :outcome, :benefits, :user_id, :status_id])
    |> validate_required([:name, :description, :solution, :outcome, :benefits, :status_id])
    |> fn x ->
      case get_tags(attrs, :tags) do
        nil -> x
        tags -> cast_assoc(x, :tags, tags)
      end
    end.()
  end

  defp get_tags(attrs, atom) do
    Map.get(attrs, to_string(atom), Map.get(attrs, atom))
  end
end
