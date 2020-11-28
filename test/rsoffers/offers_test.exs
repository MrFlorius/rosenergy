defmodule Rsoffers.OffersTest do
  use Rsoffers.DataCase

  alias Rsoffers.Offers

  describe "offers" do
    alias Rsoffers.Offers.Offer

    @valid_attrs %{description: "some description", name: "some name", outcome: "some outcome", solution: "some solution"}
    @update_attrs %{description: "some updated description", name: "some updated name", outcome: "some updated outcome", solution: "some updated solution"}
    @invalid_attrs %{description: nil, name: nil, outcome: nil, solution: nil}

    def offer_fixture(attrs \\ %{}) do
      {:ok, offer} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Offers.create_offer()

      offer
    end

    test "list_offers/0 returns all offers" do
      offer = offer_fixture()
      assert Offers.list_offers() == [offer]
    end

    test "get_offer!/1 returns the offer with given id" do
      offer = offer_fixture()
      assert Offers.get_offer!(offer.id) == offer
    end

    test "create_offer/1 with valid data creates a offer" do
      assert {:ok, %Offer{} = offer} = Offers.create_offer(@valid_attrs)
      assert offer.description == "some description"
      assert offer.name == "some name"
      assert offer.outcome == "some outcome"
      assert offer.solution == "some solution"
    end

    test "create_offer/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Offers.create_offer(@invalid_attrs)
    end

    test "update_offer/2 with valid data updates the offer" do
      offer = offer_fixture()
      assert {:ok, %Offer{} = offer} = Offers.update_offer(offer, @update_attrs)
      assert offer.description == "some updated description"
      assert offer.name == "some updated name"
      assert offer.outcome == "some updated outcome"
      assert offer.solution == "some updated solution"
    end

    test "update_offer/2 with invalid data returns error changeset" do
      offer = offer_fixture()
      assert {:error, %Ecto.Changeset{}} = Offers.update_offer(offer, @invalid_attrs)
      assert offer == Offers.get_offer!(offer.id)
    end

    test "delete_offer/1 deletes the offer" do
      offer = offer_fixture()
      assert {:ok, %Offer{}} = Offers.delete_offer(offer)
      assert_raise Ecto.NoResultsError, fn -> Offers.get_offer!(offer.id) end
    end

    test "change_offer/1 returns a offer changeset" do
      offer = offer_fixture()
      assert %Ecto.Changeset{} = Offers.change_offer(offer)
    end
  end

  describe "offer_authors" do
    alias Rsoffers.Offers.Author

    @valid_attrs %{precentage: "120.5"}
    @update_attrs %{precentage: "456.7"}
    @invalid_attrs %{precentage: nil}

    def author_fixture(attrs \\ %{}) do
      {:ok, author} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Offers.create_author()

      author
    end

    test "list_offer_authors/0 returns all offer_authors" do
      author = author_fixture()
      assert Offers.list_offer_authors() == [author]
    end

    test "get_author!/1 returns the author with given id" do
      author = author_fixture()
      assert Offers.get_author!(author.id) == author
    end

    test "create_author/1 with valid data creates a author" do
      assert {:ok, %Author{} = author} = Offers.create_author(@valid_attrs)
      assert author.precentage == Decimal.new("120.5")
    end

    test "create_author/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Offers.create_author(@invalid_attrs)
    end

    test "update_author/2 with valid data updates the author" do
      author = author_fixture()
      assert {:ok, %Author{} = author} = Offers.update_author(author, @update_attrs)
      assert author.precentage == Decimal.new("456.7")
    end

    test "update_author/2 with invalid data returns error changeset" do
      author = author_fixture()
      assert {:error, %Ecto.Changeset{}} = Offers.update_author(author, @invalid_attrs)
      assert author == Offers.get_author!(author.id)
    end

    test "delete_author/1 deletes the author" do
      author = author_fixture()
      assert {:ok, %Author{}} = Offers.delete_author(author)
      assert_raise Ecto.NoResultsError, fn -> Offers.get_author!(author.id) end
    end

    test "change_author/1 returns a author changeset" do
      author = author_fixture()
      assert %Ecto.Changeset{} = Offers.change_author(author)
    end
  end
end
