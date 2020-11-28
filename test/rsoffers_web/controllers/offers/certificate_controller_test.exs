defmodule RsoffersWeb.Offers.CertificateControllerTest do
  use RsoffersWeb.ConnCase

  alias Rsoffers.Certificates

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  def fixture(:certificate) do
    {:ok, certificate} = Certificates.create_certificate(@create_attrs)
    certificate
  end

  describe "index" do
    test "lists all certificates", %{conn: conn} do
      conn = get(conn, Routes.offers_certificate_path(conn, :index))
      assert html_response(conn, 200) =~ "Listing Certificates"
    end
  end

  describe "new certificate" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.offers_certificate_path(conn, :new))
      assert html_response(conn, 200) =~ "New Certificate"
    end
  end

  describe "create certificate" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.offers_certificate_path(conn, :create), certificate: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == Routes.offers_certificate_path(conn, :show, id)

      conn = get(conn, Routes.offers_certificate_path(conn, :show, id))
      assert html_response(conn, 200) =~ "Show Certificate"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.offers_certificate_path(conn, :create), certificate: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Certificate"
    end
  end

  describe "edit certificate" do
    setup [:create_certificate]

    test "renders form for editing chosen certificate", %{conn: conn, certificate: certificate} do
      conn = get(conn, Routes.offers_certificate_path(conn, :edit, certificate))
      assert html_response(conn, 200) =~ "Edit Certificate"
    end
  end

  describe "update certificate" do
    setup [:create_certificate]

    test "redirects when data is valid", %{conn: conn, certificate: certificate} do
      conn = put(conn, Routes.offers_certificate_path(conn, :update, certificate), certificate: @update_attrs)
      assert redirected_to(conn) == Routes.offers_certificate_path(conn, :show, certificate)

      conn = get(conn, Routes.offers_certificate_path(conn, :show, certificate))
      assert html_response(conn, 200)
    end

    test "renders errors when data is invalid", %{conn: conn, certificate: certificate} do
      conn = put(conn, Routes.offers_certificate_path(conn, :update, certificate), certificate: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Certificate"
    end
  end

  describe "delete certificate" do
    setup [:create_certificate]

    test "deletes chosen certificate", %{conn: conn, certificate: certificate} do
      conn = delete(conn, Routes.offers_certificate_path(conn, :delete, certificate))
      assert redirected_to(conn) == Routes.offers_certificate_path(conn, :index)
      assert_error_sent 404, fn ->
        get(conn, Routes.offers_certificate_path(conn, :show, certificate))
      end
    end
  end

  defp create_certificate(_) do
    certificate = fixture(:certificate)
    %{certificate: certificate}
  end
end
