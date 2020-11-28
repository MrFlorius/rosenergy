defmodule RsoffersWeb.Api.OfferControllerTest do
  use RsoffersWeb.ConnCase

  alias Rsoffers.Offers
  alias Rsoffers.Offers.Offer

  @create_attrs %{
    description: "some description",
    name: "some name",
    outcome: "some outcome",
    solution: "some solution"
  }
  @update_attrs %{
    description: "some updated description",
    name: "some updated name",
    outcome: "some updated outcome",
    solution: "some updated solution"
  }
  @invalid_attrs %{description: nil, name: nil, outcome: nil, solution: nil}

  def fixture(:offer) do
    {:ok, offer} = Offers.create_offer(@create_attrs)
    offer
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all offers", %{conn: conn} do
      conn = get(conn, Routes.api_offer_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create offer" do
    test "renders offer when data is valid", %{conn: conn} do
      conn = post(conn, Routes.api_offer_path(conn, :create), offer: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.api_offer_path(conn, :show, id))

      assert %{
               "id" => id,
               "description" => "some description",
               "name" => "some name",
               "outcome" => "some outcome",
               "solution" => "some solution"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.api_offer_path(conn, :create), offer: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update offer" do
    setup [:create_offer]

    test "renders offer when data is valid", %{conn: conn, offer: %Offer{id: id} = offer} do
      conn = put(conn, Routes.api_offer_path(conn, :update, offer), offer: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.api_offer_path(conn, :show, id))

      assert %{
               "id" => id,
               "description" => "some updated description",
               "name" => "some updated name",
               "outcome" => "some updated outcome",
               "solution" => "some updated solution"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, offer: offer} do
      conn = put(conn, Routes.api_offer_path(conn, :update, offer), offer: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete offer" do
    setup [:create_offer]

    test "deletes chosen offer", %{conn: conn, offer: offer} do
      conn = delete(conn, Routes.api_offer_path(conn, :delete, offer))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.api_offer_path(conn, :show, offer))
      end
    end
  end

  defp create_offer(_) do
    offer = fixture(:offer)
    %{offer: offer}
  end
end
