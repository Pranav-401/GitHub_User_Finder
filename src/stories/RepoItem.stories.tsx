import type { Meta, StoryObj } from "@storybook/react-vite";

import type { GithubRepo } from "../types/github";
import RepoItem from "../components/RepoItem";
import { mockRepos } from "../test/mock";

const unknownLanguageRepo: GithubRepo = {
  ...mockRepos[0],
  id: 4,
  name: "octocat/zig-sample",
  description:
    "A sample repository using a language without a configured color.",
  stargazers_count: 0,
  language: "Zig",
};

const meta = {
  title: "GitHub User Finder/Components/RepoItem",
  component: RepoItem,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A linked repository summary showing its description, language when present, and star count.",
      },
    },
  },
} satisfies Meta<typeof RepoItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Repository: Story = {
  args: { repo: mockRepos[0] },
};

export const OptionalDetailsMissing: Story = {
  args: { repo: mockRepos[1] },
  parameters: {
    docs: {
      description: {
        story:
          "Shows the fallback description and omits the language badge when those fields are null.",
      },
    },
  },
};

export const UnknownLanguageAndZeroStars: Story = {
  args: { repo: unknownLanguageRepo },
  parameters: {
    docs: {
      description: {
        story: "Shows an unrecognized language and a zero-star count.",
      },
    },
  },
};
