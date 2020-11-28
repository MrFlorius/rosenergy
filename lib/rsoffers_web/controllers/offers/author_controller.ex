defmodule RsoffersWeb.Offers.AuthorController do
  use RsoffersWeb, :controller

  alias Rsoffers.Offers
  alias Rsoffers.Offers.Author

  def index(conn, %{"offer_id" => offer_id}) do
    # IO.inspect(params)
    offer_authors =
      Offers.list_offer_authors()
      |> Rsoffers.Repo.preload(:user)
      
    render(conn, "index.html", offer_authors: offer_authors, offer_id: offer_id)
  end

  def new(conn, %{"offer_id" => offer_id}) do
    changeset = Offers.change_author(%Author{})
    render(conn, "new.html", changeset: changeset, offer_id: offer_id)
  end

  def create(conn, %{"offer_id" => offer_id, "author" => author_params}) do
    case Offers.create_author(author_params) do
      {:ok, author} ->
        conn
        |> put_flash(:info, "Author created successfully.")
        |> redirect(to: Routes.offers_offer_author_path(conn, :show, offer_id, author))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset, offer_id: offer_id)
    end
  end

  def show(conn, %{"offer_id" => offer_id, "id" => id}) do
    author = Offers.get_author!(id)
    render(conn, "show.html", author: author, offer_id: offer_id)
  end

  def edit(conn, %{"offer_id" => offer_id, "id" => id}) do
    author = Offers.get_author!(id)
    changeset = Offers.change_author(author)
    render(conn, "edit.html", author: author, changeset: changeset, offer_id: offer_id)
  end

  def update(conn, %{"offer_id" => offer_id, "id" => id, "author" => author_params}) do
    author = Offers.get_author!(id)

    case Offers.update_author(author, author_params) do
      {:ok, author} ->
        conn
        |> put_flash(:info, "Author updated successfully.")
        |> redirect(to: Routes.offers_offer_author_path(conn, :show, offer_id, author))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", author: author, changeset: changeset, offer_id: offer_id)
    end
  end

  def delete(conn, %{"offer_id" => offer_id, "id" => id}) do
    author = Offers.get_author!(id)
    {:ok, _author} = Offers.delete_author(author)

    conn
    |> put_flash(:info, "Author deleted successfully.")
    |> redirect(to: Routes.offers_offer_author_path(conn, :index, offer_id))
  end
end
