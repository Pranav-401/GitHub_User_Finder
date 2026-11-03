import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SearchBar from "./SearchBar";
import userEvent from "@testing-library/user-event";

describe("SearchBar", () => {
  it("render the input and search button", () => {
    render(<SearchBar loading={false} onSearch={vi.fn()} />);

    expect(
      screen.getByRole("textbox", {
        name: /github username/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /search/i,
      }),
    ).toBeInTheDocument();
  });

  it("updates the input when the user types", async () => {
    const user = userEvent.setup();
    render(<SearchBar loading={false} onSearch={vi.fn()} />);

    await user.type(
      screen.getByRole("textbox", {
        name: /github username/i,
      }),
      "pranav",
    );

    expect(
      screen.getByRole("textbox", {
        name: /github username/i,
      }),
    ).toHaveValue("pranav");
  });

  it("calls onSearch with the typed username when form is submitted", async () => {
    const onSearch = vi.fn();
    const user = userEvent.setup();

    render(<SearchBar loading={false} onSearch={onSearch} />);

    await user.type(
      screen.getByRole("textbox", {
        name: /github username/i,
      }),
      "pranav",
    );

    await user.click(
      screen.getByRole("button", {
        name: /search/i,
      }),
    );

    expect(onSearch).toHaveBeenCalledWith("pranav");
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it("clears the validation error when the user starts typing", async () => {
    const user = userEvent.setup();
    render(<SearchBar loading={false} onSearch={vi.fn()} />);

    await user.click(
      screen.getByRole("button", {
        name: /search/i,
      }),
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();

    await user.type(
      screen.getByRole("textbox", {
        name: /github username/i,
      }),
      "p",
    );

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
