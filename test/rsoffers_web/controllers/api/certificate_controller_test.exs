defmodule RsoffersWeb.Api.CertificateControllerTest do
  use RsoffersWeb.ConnCase

  alias Rsoffers.Certificates
  alias Rsoffers.Certificates.Certificate

  @create_attrs %{

  }
  @update_attrs %{

  }
  @invalid_attrs %{}

  def fixture(:certificate) do
    {:ok, certificate} = Certificates.create_certificate(@create_attrs)
    certificate
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all certificates", %{conn: conn} do
      conn = get(conn, Routes.api_certificate_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create certificate" do
    test "renders certificate when data is valid", %{conn: conn} do
      conn = post(conn, Routes.api_certificate_path(conn, :create), certificate: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.api_certificate_path(conn, :show, id))

      assert %{
               "id" => id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.api_certificate_path(conn, :create), certificate: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update certificate" do
    setup [:create_certificate]

    test "renders certificate when data is valid", %{conn: conn, certificate: %Certificate{id: id} = certificate} do
      conn = put(conn, Routes.api_certificate_path(conn, :update, certificate), certificate: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.api_certificate_path(conn, :show, id))

      assert %{
               "id" => id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, certificate: certificate} do
      conn = put(conn, Routes.api_certificate_path(conn, :update, certificate), certificate: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete certificate" do
    setup [:create_certificate]

    test "deletes chosen certificate", %{conn: conn, certificate: certificate} do
      conn = delete(conn, Routes.api_certificate_path(conn, :delete, certificate))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.api_certificate_path(conn, :show, certificate))
      end
    end
  end

  defp create_certificate(_) do
    certificate = fixture(:certificate)
    %{certificate: certificate}
  end
end
