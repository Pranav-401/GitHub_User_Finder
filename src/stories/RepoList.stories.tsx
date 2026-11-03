import type { Meta, StoryObj } from "@storybook/react-vite";

import RepoList from "../components/RepoList";
import { mockRepos } from "../test/mock";

const meta = {
  title: "GitHub User Finder/Components/RepoList",
  component: RepoList,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Renders a collection of repository cards or an explicit empty state when no repositories are available.",
      },
    },
  },
} satisfies Meta<typeof RepoList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithRepositories: Story = {
  args: { repos: mockRepos },
};

export const Empty: Story = {
  args: { repos: [] },
};
