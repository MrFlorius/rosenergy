defmodule Rsoffers.OfferStatusTest do
  use Rsoffers.DataCase

  alias Rsoffers.OfferStatus

  describe "offer_status" do
    alias Rsoffers.OfferStatus.Status

    @valid_attrs %{description: "some description"}
    @update_attrs %{description: "some updated description"}
    @invalid_attrs %{description: nil}

    def status_fixture(attrs \\ %{}) do
      {:ok, status} =
        attrs
        |> Enum.into(@valid_attrs)
        |> OfferStatus.create_status()

      status
    end

    test "list_offer_status/0 returns all offer_status" do
      status = status_fixture()
      assert OfferStatus.list_offer_status() == [status]
    end

    test "get_status!/1 returns the status with given id" do
      status = status_fixture()
      assert OfferStatus.get_status!(status.id) == status
    end

    test "create_status/1 with valid data creates a status" do
      assert {:ok, %Status{} = status} = OfferStatus.create_status(@valid_attrs)
      assert status.description == "some description"
    end

    test "create_status/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = OfferStatus.create_status(@invalid_attrs)
    end

    test "update_status/2 with valid data updates the status" do
      status = status_fixture()
      assert {:ok, %Status{} = status} = OfferStatus.update_status(status, @update_attrs)
      assert status.description == "some updated description"
    end

    test "update_status/2 with invalid data returns error changeset" do
      status = status_fixture()
      assert {:error, %Ecto.Changeset{}} = OfferStatus.update_status(status, @invalid_attrs)
      assert status == OfferStatus.get_status!(status.id)
    end

    test "delete_status/1 deletes the status" do
      status = status_fixture()
      assert {:ok, %Status{}} = OfferStatus.delete_status(status)
      assert_raise Ecto.NoResultsError, fn -> OfferStatus.get_status!(status.id) end
    end

    test "change_status/1 returns a status changeset" do
      status = status_fixture()
      assert %Ecto.Changeset{} = OfferStatus.change_status(status)
    end
  end
end
