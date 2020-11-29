defmodule Rsoffers.Users.User do
  use Ecto.Schema
  use Pow.Ecto.Schema

  import Ecto.Changeset

  schema "users" do
    field :first_name, :string
    field :last_name, :string
    field :organisation, :string
    field :department, :string
    field :year_of_birth, :string
    field :job, :string
    field :education, :string
    field :expirience, :string

    belongs_to :group, Rsoffers.Groups.Group

    has_many :certificates, Rsoffers.Certificates.Certificate

    has_many :offers, Rsoffers.Offers.Offer
    has_many :authors, Rsoffers.Offers.Author

    pow_user_fields()

    timestamps()
  end

  def changeset(user, attrs) do
    user
    |> cast(attrs, [:first_name, :last_name, :group_id, :organisation, :department, :year_of_birth, :job, :education, :expirience])
    |> validate_required([:first_name, :last_name])
    |> pow_changeset(attrs)
  end
end
