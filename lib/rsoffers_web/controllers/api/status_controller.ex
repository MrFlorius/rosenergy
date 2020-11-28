defmodule RsoffersWeb.Api.StatusController do
  use RsoffersWeb, :controller

  alias Rsoffers.OfferStatus
  alias Rsoffers.OfferStatus.Status

  action_fallback RsoffersWeb.FallbackController

  def index(conn, _params) do
    offer_status = OfferStatus.list_offer_status()
    render(conn, "index.json", offer_status: offer_status)
  end

  def create(conn, %{"status" => status_params}) do
    with {:ok, %Status{} = status} <- OfferStatus.create_status(status_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.api_status_path(conn, :show, status))
      |> render("show.json", status: status)
    end
  end

  def show(conn, %{"id" => id}) do
    status = OfferStatus.get_status!(id)
    render(conn, "show.json", status: status)
  end

  def update(conn, %{"id" => id, "status" => status_params}) do
    status = OfferStatus.get_status!(id)

    with {:ok, %Status{} = status} <- OfferStatus.update_status(status, status_params) do
      render(conn, "show.json", status: status)
    end
  end

  def delete(conn, %{"id" => id}) do
    status = OfferStatus.get_status!(id)

    with {:ok, %Status{}} <- OfferStatus.delete_status(status) do
      send_resp(conn, :no_content, "")
    end
  end
end
