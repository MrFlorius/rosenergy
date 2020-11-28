defmodule RsoffersWeb.Api.OfferController do
  use RsoffersWeb, :controller

  alias Rsoffers.Offers
  alias Rsoffers.Offers.Offer

  action_fallback RsoffersWeb.FallbackController

  def index(conn, _params) do
    offers = Offers.list_offers()
    render(conn, "index.json", offers: offers)
  end

  def create(conn, %{"offer" => offer_params}) do
    with {:ok, %Offer{} = offer} <- Offers.create_offer(offer_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.api_offer_path(conn, :show, offer))
      |> render("show.json", offer: offer)
    end
  end

  def show(conn, %{"id" => id}) do
    offer = Offers.get_offer!(id)
    render(conn, "show.json", offer: offer)
  end

  def update(conn, %{"id" => id, "offer" => offer_params}) do
    offer = Offers.get_offer!(id)

    with {:ok, %Offer{} = offer} <- Offers.update_offer(offer, offer_params) do
      render(conn, "show.json", offer: offer)
    end
  end

  def delete(conn, %{"id" => id}) do
    offer = Offers.get_offer!(id)

    with {:ok, %Offer{}} <- Offers.delete_offer(offer) do
      send_resp(conn, :no_content, "")
    end
  end
end
