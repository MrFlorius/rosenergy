defmodule RsoffersWeb.ViewHelpers do
  alias Rsoffers.Users.User
  alias Rsoffers.Offers.Offer
  alias Rsoffers.OfferStatus.Status

  def get_user_opts() do
    Rsoffers.Users.list_users()
    |> Enum.map(fn %User{} = u -> {"#{u.first_name} #{u.last_name}", u.id} end)
  end

  def get_current_user(%{user_id: id}), do: id
  def get_current_user(_), do: nil

  def get_offer_opts() do
    Rsoffers.Offers.list_offers()
    |> Enum.map(fn %Offer{} = o -> {o.name, o.id} end)
  end

  def get_current_offer(%{offer_id: id}), do: id
  def get_current_offer(_), do: nil

  def get_status_opts() do
    Rsoffers.OfferStatus.list_offer_status()
    |> Enum.map(fn %Status{} = s -> {s.description, s.id} end)
  end

  def get_current_status(%{status_id: id}), do: id
  def get_current_status(_), do: Rsoffers.OfferStatus.get_default_status().id
end
