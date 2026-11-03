import type { Meta, StoryObj } from "@storybook/react-vite";
import { http, HttpResponse, delay } from "msw";

import App from "../App";

const mockUser = {
  login: "octocat",
  id: 583231,
  avatar_url: "https://github.com/images/error/octocat_happy.gif",
  html_url: "https://github.com/octocat",
  name: "The Octocat",
  bio: "GitHub mascot and developer",
  company: "@github",
  location: "San Francisco",
  blog: "https://github.blog",
  twitter_username: "github",
  public_repos: 8,
  followers: 1000,
  following: 9,
  created_at: "2011-01-25T18:44:36Z",
};

const mockRepos = [
  {
    id: 1,
    name: "Hello-World",
    full_name: "octocat/Hello-World",
    description: "My first repository on GitHub!",
    html_url: "https://github.com/octocat/Hello-World",
    stargazers_count: 100,
    forks_count: 25,
    language: "JavaScript",
    updated_at: "2026-10-20T12:00:00Z",
  },
  {
    id: 2,
    name: "Spoon-Knife",
    full_name: "octocat/Spoon-Knife",
    description: "This repo is for demonstration purposes.",
    html_url: "https://github.com/octocat/Spoon-Knife",
    stargazers_count: 250,
    forks_count: 80,
    language: "HTML",
    updated_at: "2026-10-18T12:00:00Z",
  },
  {
    id: 3,
    name: "git-consortium",
    full_name: "octocat/git-consortium",
    description: null,
    html_url: "https://github.com/octocat/git-consortium",
    stargazers_count: 45,
    forks_count: 10,
    language: "TypeScript",
    updated_at: "2026-10-15T12:00:00Z",
  },
];

const meta = {
  title: "App",
  component: App,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyState: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://api.github.com/users/:username", () =>
          HttpResponse.json(mockUser),
        ),
        http.get("https://api.github.com/users/:username/repos", () =>
          HttpResponse.json(mockRepos),
        ),
      ],
    },
  },
};

export const SuccessfulSearch: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://api.github.com/users/:username", () =>
          HttpResponse.json(mockUser),
        ),
        http.get("https://api.github.com/users/:username/repos", () =>
          HttpResponse.json(mockRepos),
        ),
      ],
    },
  },
  play: async ({ canvas, userEvent }) => {
    const searchInput = canvas.getByRole("textbox");
    await userEvent.type(searchInput, "octocat");
    await userEvent.click(canvas.getByRole("button", { name: /search/i }));

    await canvas.findByText("The Octocat");
    await canvas.findByText("Hello-World");
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://api.github.com/users/:username", async () => {
          await delay("infinite");
          return HttpResponse.json(mockUser);
        }),
      ],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("textbox"), "octocat");
    await userEvent.click(canvas.getByRole("button", { name: /search/i }));

    await canvas.findByLabelText("Loading");
  },
};

export const UserNotFound: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://api.github.com/users/:username", () =>
          HttpResponse.json({ message: "Not Found" }, { status: 404 }),
        ),
      ],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("textbox"), "unknown-user");
    await userEvent.click(canvas.getByRole("button", { name: /search/i }));

    await canvas.findByRole("alert");
  },
};

export const ApiError: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://api.github.com/users/:username", () =>
          HttpResponse.json(
            { message: "API rate limit exceeded" },
            { status: 403 },
          ),
        ),
      ],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("textbox"), "octocat");
    await userEvent.click(canvas.getByRole("button", { name: /search/i }));

    await canvas.findByText("Something went wrong. Please try again.");
  },
};

export const EmptyRepositories: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get("https://api.github.com/users/:username", () =>
          HttpResponse.json(mockUser),
        ),
        http.get("https://api.github.com/users/:username/repos", () =>
          HttpResponse.json([]),
        ),
      ],
    },
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("textbox"), "octocat");
    await userEvent.click(canvas.getByRole("button", { name: /search/i }));

    await canvas.findByText("The Octocat");
  },
};
