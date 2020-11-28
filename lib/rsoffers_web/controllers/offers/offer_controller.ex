defmodule RsoffersWeb.Offers.OfferController do
  use RsoffersWeb, :controller

  alias Rsoffers.Offers
  alias Rsoffers.Offers.Offer

  def index(conn, _params) do
    offers = Offers.list_offers()
    render(conn, "index.html", offers: offers)
  end

  def new(conn, _params) do
    changeset = Offers.change_offer(%Offer{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"offer" => offer_params}) do
    case offer_params
         |> Map.put("user_id", conn.assigns.current_user.id)
         |> Offers.create_offer() do
      {:ok, offer} ->
        conn
        |> put_flash(:info, "Offer created successfully.")
        |> redirect(to: Routes.offers_offer_path(conn, :show, offer))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    offer = Offers.get_offer!(id)
    render(conn, "show.html", offer: offer)
  end

  def edit(conn, %{"id" => id}) do
    offer = Offers.get_offer!(id)
    changeset = Offers.change_offer(offer)
    render(conn, "edit.html", offer: offer, changeset: changeset)
  end

  def update(conn, %{"id" => id, "offer" => offer_params}) do
    offer = Offers.get_offer!(id)

    case Offers.update_offer(offer, offer_params) do
      {:ok, offer} ->
        conn
        |> put_flash(:info, "Offer updated successfully.")
        |> redirect(to: Routes.offers_offer_path(conn, :show, offer))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", offer: offer, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    offer = Offers.get_offer!(id)
    {:ok, _offer} = Offers.delete_offer(offer)

    conn
    |> put_flash(:info, "Offer deleted successfully.")
    |> redirect(to: Routes.offers_offer_path(conn, :index))
  end

  def download(conn, %{"id" => id}) do
    offer = Offers.get_offer!(id)

    with {:ok, doc} <- Rsoffers.DocFmt.render("test.docx", %{value: "hi from elixir"}) do
      conn
      |> put_resp_content_type("text/csv")
      |> put_resp_header(
        "content-disposition",
        "attachment; filename=\"Заявление на рацпредложение #{offer.name}.docx\"")
      |> send_resp(200, doc)
    end
  end
end
