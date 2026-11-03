import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

import ErrorMessage from "../components/ErrorMessage";

const meta = {
  title: "GitHub User Finder/Components/ErrorMessage",
  component: ErrorMessage,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "An alert message with an optional retry action for recoverable errors.",
      },
    },
  },
  args: {
    message: "Something went wrong. Please try again.",
  },
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithRetry: Story = {
  args: { onRetry: fn() },
  play: async ({ canvas, args }) => {
    await userEvent.click(canvas.getByRole("button", { name: /try again/i }));
    await expect(args.onRetry).toHaveBeenCalledTimes(1);
  },
};

export const WithoutRetry: Story = {
  args: { onRetry: undefined },
};
