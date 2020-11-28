defmodule RsoffersWeb.Api.AuthorController do
  use RsoffersWeb, :controller

  alias Rsoffers.Offers
  alias Rsoffers.Offers.Author

  action_fallback RsoffersWeb.FallbackController

  def index(conn, _params) do
    offer_authors = Offers.list_offer_authors()
    render(conn, "index.json", offer_authors: offer_authors)
  end

  def create(conn, %{"author" => author_params}) do
    with {:ok, %Author{} = author} <- Offers.create_author(author_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.api_author_path(conn, :show, author))
      |> render("show.json", author: author)
    end
  end

  def show(conn, %{"id" => id}) do
    author = Offers.get_author!(id)
    render(conn, "show.json", author: author)
  end

  def update(conn, %{"id" => id, "author" => author_params}) do
    author = Offers.get_author!(id)

    with {:ok, %Author{} = author} <- Offers.update_author(author, author_params) do
      render(conn, "show.json", author: author)
    end
  end

  def delete(conn, %{"id" => id}) do
    author = Offers.get_author!(id)

    with {:ok, %Author{}} <- Offers.delete_author(author) do
      send_resp(conn, :no_content, "")
    end
  end
end
