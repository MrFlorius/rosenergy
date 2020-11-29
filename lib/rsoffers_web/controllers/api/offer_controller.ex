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
      offer = Rsoffers.Repo.preload(offer, [:user, :status, :authors, :tags])
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

  def download(conn, %{"id" => id}) do
    offer = Offers.get_offer!(id)

    with {:ok, doc} <- Rsoffers.DocFmt.render("offer.docx", to_py_offer(offer)) do
      conn
      |> put_resp_content_type("text/csv")
      |> put_resp_header(
        "content-disposition",
        "attachment; filename=\"Заявление на рацпредложение #{offer.name}.docx\"")
      |> send_resp(200, doc)
    end
  end

  defp to_py_offer(offer) do
    %{
      name: offer.name,
      description: offer.description,
      solution: offer.solution,
      outcome: offer.outcome,
      date: get_datetime(),
      user: to_py_user(offer.user)
    }
  end

  defp to_py_user(user) do
    %{id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    organisation: user.organisation,
    department: user.department,
    year_of_birth: user.year_of_birth,
    job: user.job,
    education: user.education,
    expirience: user.expirience,
    email: user.email
  }
  end

  defp get_datetime() do
    d =  DateTime.utc_now()
    "#{d.year}/#{d.month}/#{d.day}"
  end
end
