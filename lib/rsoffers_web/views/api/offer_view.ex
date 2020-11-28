defmodule RsoffersWeb.Api.OfferView do
  use RsoffersWeb, :view
  alias RsoffersWeb.Api.OfferView

  def render("index.json", %{offers: offers}) do
    %{data: render_many(offers, OfferView, "offer.json")}
  end

  def render("show.json", %{offer: offer}) do
    %{data: render_one(offer, OfferView, "offer.json")}
  end

  def render("offer.json", %{offer: offer}) do
    %{id: offer.id,
      name: offer.name,
      description: offer.description,
      solution: offer.solution,
      outcome: offer.outcome,
      status_id: offer.status_id,
      user_id: offer.user_id,
      user: render_one(offer.user, RsoffersWeb.Api.UserView, "user.json"),
      status: render_one(offer.status, RsoffersWeb.Api.StatusView, "status.json"),
      authors: render_many(offer.authors, RsoffersWeb.Api.AuthorView, "author.json"),
      tags: render_many(offer.tags, RsoffersWeb.Api.TagView, "tag.json")
    }
  end
end
