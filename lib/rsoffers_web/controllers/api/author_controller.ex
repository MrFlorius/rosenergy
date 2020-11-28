defmodule RsoffersWeb.Api.AuthorController do
  use RsoffersWeb, :controller

  alias Rsoffers.Offers
  alias Rsoffers.Offers.Author

  def index(conn, _params) do
    offer_authors = Offers.list_offer_authors()
    render(conn, "index.html", offer_authors: offer_authors)
  end

  def new(conn, _params) do
    changeset = Offers.change_author(%Author{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"author" => author_params}) do
    case Offers.create_author(author_params) do
      {:ok, author} ->
        conn
        |> put_flash(:info, "Author created successfully.")
        |> redirect(to: Routes.api_author_path(conn, :show, author))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    author = Offers.get_author!(id)
    render(conn, "show.html", author: author)
  end

  def edit(conn, %{"id" => id}) do
    author = Offers.get_author!(id)
    changeset = Offers.change_author(author)
    render(conn, "edit.html", author: author, changeset: changeset)
  end

  def update(conn, %{"id" => id, "author" => author_params}) do
    author = Offers.get_author!(id)

    case Offers.update_author(author, author_params) do
      {:ok, author} ->
        conn
        |> put_flash(:info, "Author updated successfully.")
        |> redirect(to: Routes.api_author_path(conn, :show, author))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", author: author, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    author = Offers.get_author!(id)
    {:ok, _author} = Offers.delete_author(author)

    conn
    |> put_flash(:info, "Author deleted successfully.")
    |> redirect(to: Routes.api_author_path(conn, :index))
  end
end
