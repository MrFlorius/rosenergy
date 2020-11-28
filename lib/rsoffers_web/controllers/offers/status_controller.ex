defmodule RsoffersWeb.Offers.StatusController do
  use RsoffersWeb, :controller

  alias Rsoffers.OfferStatus
  alias Rsoffers.OfferStatus.Status

  def index(conn, _params) do
    offer_status = OfferStatus.list_offer_status()
    render(conn, "index.html", offer_status: offer_status)
  end

  def new(conn, _params) do
    changeset = OfferStatus.change_status(%Status{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"status" => status_params}) do
    case OfferStatus.create_status(status_params) do
      {:ok, status} ->
        conn
        |> put_flash(:info, "Status created successfully.")
        |> redirect(to: Routes.offers_status_path(conn, :show, status))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    status = OfferStatus.get_status!(id)
    render(conn, "show.html", status: status)
  end

  def edit(conn, %{"id" => id}) do
    status = OfferStatus.get_status!(id)
    changeset = OfferStatus.change_status(status)
    render(conn, "edit.html", status: status, changeset: changeset)
  end

  def update(conn, %{"id" => id, "status" => status_params}) do
    status = OfferStatus.get_status!(id)

    case OfferStatus.update_status(status, status_params) do
      {:ok, status} ->
        conn
        |> put_flash(:info, "Status updated successfully.")
        |> redirect(to: Routes.offers_status_path(conn, :show, status))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", status: status, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    status = OfferStatus.get_status!(id)
    {:ok, _status} = OfferStatus.delete_status(status)

    conn
    |> put_flash(:info, "Status deleted successfully.")
    |> redirect(to: Routes.offers_status_path(conn, :index))
  end
end
