defmodule RsoffersWeb.Api.CertificateView do
  use RsoffersWeb, :view
  alias RsoffersWeb.Api.CertificateView

  def render("index.json", %{certificates: certificates}) do
    %{data: render_many(certificates, CertificateView, "certificate.json")}
  end

  def render("show.json", %{certificate: certificate}) do
    %{data: render_one(certificate, CertificateView, "certificate.json")}
  end

  def render("certificate.json", %{certificate: certificate}) do
    %{id: certificate.id}
  end
end
