defmodule RsoffersWeb.Offers.OfferControllerTest do
  use RsoffersWeb.ConnCase

  alias Rsoffers.Offers

  @create_attrs %{description: "some description", name: "some name", outcome: "some outcome", solution: "some solution"}
  @update_attrs %{description: "some updated description", name: "some updated name", outcome: "some updated outcome", solution: "some updated solution"}
  @invalid_attrs %{description: nil, name: nil, outcome: nil, solution: nil}

  def fixture(:offer) do
    {:ok, offer} = Offers.create_offer(@create_attrs)
    offer
  end

  describe "index" do
    test "lists all offers", %{conn: conn} do
      conn = get(conn, Routes.offers_offer_path(conn, :index))
      assert html_response(conn, 200) =~ "Listing Offers"
    end
  end

  describe "new offer" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.offers_offer_path(conn, :new))
      assert html_response(conn, 200) =~ "New Offer"
    end
  end

  describe "create offer" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.offers_offer_path(conn, :create), offer: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == Routes.offers_offer_path(conn, :show, id)

      conn = get(conn, Routes.offers_offer_path(conn, :show, id))
      assert html_response(conn, 200) =~ "Show Offer"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.offers_offer_path(conn, :create), offer: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Offer"
    end
  end

  describe "edit offer" do
    setup [:create_offer]

    test "renders form for editing chosen offer", %{conn: conn, offer: offer} do
      conn = get(conn, Routes.offers_offer_path(conn, :edit, offer))
      assert html_response(conn, 200) =~ "Edit Offer"
    end
  end

  describe "update offer" do
    setup [:create_offer]

    test "redirects when data is valid", %{conn: conn, offer: offer} do
      conn = put(conn, Routes.offers_offer_path(conn, :update, offer), offer: @update_attrs)
      assert redirected_to(conn) == Routes.offers_offer_path(conn, :show, offer)

      conn = get(conn, Routes.offers_offer_path(conn, :show, offer))
      assert html_response(conn, 200) =~ "some updated description"
    end

    test "renders errors when data is invalid", %{conn: conn, offer: offer} do
      conn = put(conn, Routes.offers_offer_path(conn, :update, offer), offer: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Offer"
    end
  end

  describe "delete offer" do
    setup [:create_offer]

    test "deletes chosen offer", %{conn: conn, offer: offer} do
      conn = delete(conn, Routes.offers_offer_path(conn, :delete, offer))
      assert redirected_to(conn) == Routes.offers_offer_path(conn, :index)
      assert_error_sent 404, fn ->
        get(conn, Routes.offers_offer_path(conn, :show, offer))
      end
    end
  end

  defp create_offer(_) do
    offer = fixture(:offer)
    %{offer: offer}
  end
end
