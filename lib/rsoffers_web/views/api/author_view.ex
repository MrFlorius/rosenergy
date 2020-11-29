defmodule RsoffersWeb.Api.AuthorView do
  use RsoffersWeb, :view
  alias RsoffersWeb.Api.AuthorView

  def render("index.json", %{offer_authors: offer_authors}) do
    %{data: render_many(offer_authors, AuthorView, "author.json")}
  end

  def render("show.json", %{author: author}) do
    %{data: render_one(author, AuthorView, "author.json")}
  end

  def render("author.json", %{author: author}) do
    %{id: author.id,
      user_id: author.user_id,
      offer_id: author.offer_id,
      precentage: author.precentage}
  end
end
