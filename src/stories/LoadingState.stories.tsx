import type { Meta, StoryObj } from "@storybook/react-vite";

import LoadingState from "../components/LoadingState";

const meta = {
  title: "GitHub User Finder/Components/LoadingState",
  component: LoadingState,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The skeleton placeholder displayed while profile and repository data is loading.",
      },
    },
  },
} satisfies Meta<typeof LoadingState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
