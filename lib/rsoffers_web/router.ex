defmodule RsoffersWeb.Router do
  use RsoffersWeb, :router
  use Pow.Phoenix.Router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug CORSPlug, origin: "*"
    plug :accepts, ["json"]
  end

  pipeline :protected do
    plug Pow.Plug.RequireAuthenticated,
      error_handler: Pow.Phoenix.PlugErrorHandler
  end

  scope "/", RsoffersWeb do
    pipe_through :browser

    get "/", FrontendController, :index
    get "/projects/create", FrontendController, :index
    get "/projects", FrontendController, :index
    get "/project/:id", FrontendController, :index
    get "/myprojects", FrontendController, :index

    get "/old", PageController, :index
  end

  scope "/auth" do
    pipe_through :browser
    pow_routes()
  end

  scope "/auth", RsoffersWeb.Auth, as: :auth do
    pipe_through [:browser, :protected]

    resources "/groups", GroupController
    resources "/users", UserController
  end

  scope "/offers", RsoffersWeb.Offers, as: :offers do
    pipe_through [:browser, :protected]

    resources "/offer_status", StatusController
    resources "/certificates", CertificateController
    resources "/tags", TagController

    resources "/", OfferController do
      resources "/authors", AuthorController
    end
  end

  scope "/api", RsoffersWeb.Api, as: :api do
    pipe_through :api

    get "/offers/:id/download", OfferController, :download

    resources "/groups", GroupController
    options "/groups", GroupController, :options

    resources "/users", UserController
    options "/users", UserController, :options

    resources "/offer_authors", AuthorController
    options "/offer_authors", AuthorController, :options

    resources "/offer_status", StatusController
    options "/offer_status", StatusController, :options

    resources "/offers", OfferController
    options "/offers", OfferController, :options

    resources "/tags", TagController
    options "/tags", TagController, :options

    resources "/certificates", CertificateController
    options "/certificates", CertificateController, :options
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: RsoffersWeb.Telemetry, ecto_repos: [Rsoffers.Repo]
    end
  end
end
