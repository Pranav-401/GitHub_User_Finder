import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import SearchBar from "../components/SearchBar";

const meta = {
  title: "GitHub User Finder/Components/SearchBar",
  component: SearchBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A username search form with empty-input validation, input clearing, and a disabled loading state.",
      },
    },
  },
  args: {
    onSearch: fn(),
    loading: false,
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptyInputValidation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Shows the validation message when the form is submitted without a username.",
      },
    },
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: /search/i }));
    await expect(canvas.getByRole("alert")).toHaveTextContent(
      "Please enter a GitHub username.",
    );
  },
};

export const KeyboardSubmission: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Submits a username with Enter and reports the trimmed value through onSearch.",
      },
    },
  },
  play: async ({ canvas, args }) => {
    const input = canvas.getByRole("textbox", { name: /github username/i });
    await userEvent.click(input);
    await userEvent.type(input, " octocat ");
    await expect(input).toHaveValue(" octocat ");
    await userEvent.keyboard("{Enter}");
    await expect(args.onSearch).toHaveBeenCalledWith("octocat");
  },
};

export const ClearInput: Story = {
  play: async ({ canvas }) => {
    const input = canvas.getByRole("textbox", { name: /github username/i });
    await userEvent.click(input);
    await userEvent.type(input, "octocat");
    await userEvent.click(canvas.getByRole("button", { name: /clear input/i }));
    await expect(input).toHaveValue("");
    await expect(
      canvas.queryByRole("button", { name: /clear input/i }),
    ).not.toBeInTheDocument();
  },
};

export const Loading: Story = {
  args: { loading: true },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("textbox", { name: /github username/i }),
    ).toBeDisabled();
    await expect(
      canvas.getByRole("button", { name: /search/i }),
    ).toBeDisabled();
  },
};
