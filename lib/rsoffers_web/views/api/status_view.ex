defmodule RsoffersWeb.Api.StatusView do
  use RsoffersWeb, :view
  alias RsoffersWeb.Api.StatusView

  def render("index.json", %{offer_status: offer_status}) do
    %{data: render_many(offer_status, StatusView, "status.json")}
  end

  def render("show.json", %{status: status}) do
    %{data: render_one(status, StatusView, "status.json")}
  end

  def render("status.json", %{status: status}) do
    %{id: status.id,
      description: status.description}
  end
end
