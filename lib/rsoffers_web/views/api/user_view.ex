defmodule RsoffersWeb.Api.UserView do
  use RsoffersWeb, :view
  alias RsoffersWeb.Api.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      organisation: user.organisation,
      department: user.department,
      year_of_birth: user.year_of_birth,
      job: user.job,
      education: user.education,
      expirience: user.expirience,
      email: user.email
    }
  end
end
