defmodule RsoffersWeb.Api.CertificateController do
  use RsoffersWeb, :controller

  alias Rsoffers.Certificates
  alias Rsoffers.Certificates.Certificate

  action_fallback RsoffersWeb.FallbackController

  def index(conn, _params) do
    certificates = Certificates.list_certificates()
    render(conn, "index.json", certificates: certificates)
  end

  def create(conn, %{"certificate" => certificate_params}) do
    with {:ok, %Certificate{} = certificate} <- Certificates.create_certificate(certificate_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.api_certificate_path(conn, :show, certificate))
      |> render("show.json", certificate: certificate)
    end
  end

  def show(conn, %{"id" => id}) do
    certificate = Certificates.get_certificate!(id)
    render(conn, "show.json", certificate: certificate)
  end

  def update(conn, %{"id" => id, "certificate" => certificate_params}) do
    certificate = Certificates.get_certificate!(id)

    with {:ok, %Certificate{} = certificate} <- Certificates.update_certificate(certificate, certificate_params) do
      render(conn, "show.json", certificate: certificate)
    end
  end

  def delete(conn, %{"id" => id}) do
    certificate = Certificates.get_certificate!(id)

    with {:ok, %Certificate{}} <- Certificates.delete_certificate(certificate) do
      send_resp(conn, :no_content, "")
    end
  end
end
