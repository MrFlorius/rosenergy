defmodule Rsoffers.DocFmt do
  def render(template, context) do
    [python: p, script: s] = Application.fetch_env!(:rsoffers, :docfmt)

    with {:ok, data} <- Jason.encode(%{template: template, context: context}) do

      case System.cmd(p, [s, data]) do

        {"template not found", _} -> {:error, :not_found}
        {"bad_args", 0} -> {:error, :invalid_args}
        {doc, 0} -> {:ok, doc}
        {_, code} -> {:error, code}
      end

    end
  end
end
