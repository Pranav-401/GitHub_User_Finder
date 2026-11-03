import type { Meta, StoryObj } from "@storybook/react-vite";

import UserCard from "../components/UserCard";
import { mockUser, mockUserMinimal } from "../test/mock";

const meta = {
  title: "GitHub User Finder/Components/UserCard",
  component: UserCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Displays a GitHub profile, optional biography and location, and repository/follower statistics.",
      },
    },
  },
} satisfies Meta<typeof UserCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullProfile: Story = {
  args: { user: mockUser },
};

export const OptionalDetailsMissing: Story = {
  args: { user: mockUserMinimal },
  parameters: {
    docs: {
      description: {
        story:
          "Shows a profile with no display name, biography, location, or activity counts.",
      },
    },
  },
};

export const LargeStatistics: Story = {
  args: {
    user: {
      ...mockUser,
      public_repos: 1_234_567,
      followers: 12_500,
      following: 999,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exercises the compact K/M formatting used for large profile statistics.",
      },
    },
  },
};
