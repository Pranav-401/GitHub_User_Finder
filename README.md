# GitHub User Finder

A React and TypeScript application that lets you search for GitHub users and explore their public profiles and recently updated repositories.

Built to practise **React component architecture, custom hooks, type-safe development, automated testing with Vitest, and CI with GitHub Actions**.

<p align="center">
  <a href="https://github.com/Pranav-401/GitHub_User_Finder/actions/workflows/ci.yml">
    <img src="https://github.com/Pranav-401/GitHub_User_Finder/actions/workflows/ci.yml/badge.svg?branch=master" alt="CI Status" />
  </a>
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vitest-5-6E9F18?logo=vitest&logoColor=white" alt="Vitest" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite" />
</p>

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [React and TypeScript Design](#react-and-typescript-design)
- [Custom Hook: useGithubUser](#custom-hook-usegithubuser)
- [Testing Strategy](#testing-strategy)
- [GitHub Actions CI](#github-actions-ci)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Commands](#available-commands)
- [Future Improvements](#future-improvements)
- [Author](#author)

## Overview

GitHub User Finder consumes the public GitHub REST API to retrieve profile information and repository data using a GitHub username.

The application separates UI components from data-fetching logic through a custom React hook. TypeScript interfaces define the expected shapes of GitHub users and repositories, while Vitest and React Testing Library help verify component behaviour and asynchronous operations.

The project also includes a GitHub Actions workflow that builds and tests the application on a self-hosted Windows x64 runner.

### How It Works

1. Enter a GitHub username in the search field.
2. The application requests the user's public profile from the GitHub API.
3. If the user exists, the application retrieves up to six repositories sorted by recently updated.
4. The profile and repository information appear in separate React components.
5. Loading indicators and error messages provide feedback during unsuccessful or incomplete requests.

## Features

### GitHub Profile Search

- Search for users by GitHub username.
- Validate empty input before submitting a search.
- Display the user's avatar, name, username, bio and location when available.
- Display repository, follower and following counts.
- Format large numbers using readable `K` and `M` suffixes.

### Repository Exploration

- Retrieve up to six recently updated public repositories.
- Display repository names and descriptions.
- Show repository programming languages with language-specific indicators.
- Display repository star counts.
- Open repository links directly on GitHub.
- Show fallback text when a repository has no description or programming language.

### User Experience

- Loading skeletons while profile information is being retrieved.
- Clear error messages when a user does not exist or a request fails.
- Retry/reset functionality for returning to the initial state.
- Input clearing and validation feedback.
- Accessible labels and semantic elements for important interactions.

## Tech Stack

| Technology                    | Purpose                                          |
| ----------------------------- | ------------------------------------------------ |
| React 19                      | Component-based user interface                   |
| TypeScript 6                  | Static typing for data, props and hook contracts |
| React Hooks                   | State management and reusable application logic  |
| GitHub REST API               | Fetch public user profiles and repositories      |
| Vite 8                        | Development server and production build          |
| Vitest 5                      | Unit and component testing                       |
| React Testing Library         | Testing components and user-visible behaviour    |
| `@testing-library/user-event` | Simulating user interactions                     |
| `@testing-library/jest-dom`   | DOM-specific assertions                          |
| jsdom                         | Browser-like environment for automated tests     |
| ESLint                        | Static code analysis and linting                 |
| GitHub Actions                | Automated CI workflow                            |
| Windows self-hosted runner    | Executes CI jobs on a personal Windows PC        |

## React and TypeScript Design

### 1. Component-Based Architecture

The application separates presentation into focused React components.

| Component      | Responsibility                                          |
| -------------- | ------------------------------------------------------- |
| `App`          | Coordinates the search flow and application states      |
| `SearchBar`    | Accepts usernames, validates input and submits searches |
| `UserCard`     | Displays profile information and account statistics     |
| `RepoList`     | Renders repository collections and empty states         |
| `RepoItem`     | Displays an individual repository                       |
| `LoadingState` | Renders loading skeletons                               |
| `ErrorMessage` | Displays errors and an optional retry action            |

This separation makes individual components easier to understand, reuse and test.

### 2. Custom React Hook

The `useGithubUser` hook encapsulates the application's data-fetching and state-management logic.

Instead of putting API requests directly inside UI components, the hook exposes the data and operations required by the interface.

```tsx
const { user, repos, loading, error, searchUser, reset } = useGithubUser();
```

The hook manages:

- The currently selected user.
- The retrieved repository collection.
- Loading state.
- Error state.
- Asynchronous profile and repository requests.
- Resetting the application to its initial state.

This approach keeps the main application component focused on rendering and coordinating the UI.

### 3. TypeScript Contracts

The project defines explicit interfaces for GitHub API data.

```typescript
export interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
}
```

These interfaces document the properties used by the application and help TypeScript detect incompatible values during development.

Component props are also explicitly typed. The custom hook defines a return interface that describes its state and available operations.

**Important:** TypeScript interfaces provide compile-time checks; they do not validate external API responses at runtime.

## Custom Hook: `useGithubUser`

The hook is the central part of the application's data-fetching workflow.

### State Management

The hook uses React's `useState` to manage four pieces of state:

| State     | Type                 | Purpose                                     |
| --------- | -------------------- | ------------------------------------------- |
| `user`    | `GithubUser \| null` | Retrieved profile or no selected user       |
| `repos`   | `GithubRepo[]`       | Retrieved repository collection             |
| `loading` | `boolean`            | Indicates an active request                 |
| `error`   | `string \| null`     | Holds an error message when a request fails |

### API Requests

The hook calls two GitHub REST API endpoints:

**Fetch a user profile**

```text
GET https://api.github.com/users/{username}
```

**Fetch recently updated repositories**

```text
GET https://api.github.com/users/{username}/repos?sort=updated&per_page=6
```

### Error Handling

The implementation handles several failure scenarios:

- **User not found:** Displays a username-specific message for HTTP 404.
- **Other profile request errors:** Displays a general error message.
- **Network failures:** Displays a connection-related error.
- **Loading completion:** Uses `finally` to reset the loading state.
- **Reset:** Clears the selected user, repositories, error and loading state.

This structure makes asynchronous behaviour easier to reason about and test independently of the UI.

## Testing Strategy

Testing is a core part of this project. The goal is to verify observable behaviour rather than only check whether components render.

The project uses Vitest, React Testing Library, `user-event` and jsdom.

### Test Coverage by Area

| Test file                | What it verifies                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `SearchBar.test.tsx`     | Input rendering, typing, form submission and validation feedback                     |
| `UserCard.test.tsx`      | Profile information and user statistics                                              |
| `RepoList.test.tsx`      | Repository collection rendering and empty states                                     |
| `RepoItem.test.tsx`      | Repository name, stars, language and missing-description handling                    |
| `userGithubUser.test.ts` | Initial state, successful searches, API errors, network failures and reset behaviour |
| `formatNumber.test.ts`   | Number formatting for ordinary, thousands and millions of values                     |

### Testing Asynchronous Hooks

The custom hook is tested independently using React Testing Library's `renderHook`, `act` and `waitFor` utilities.

The tests mock `fetch` so that success and failure scenarios can be reproduced without making real GitHub API requests.

For example, the hook tests verify that a successful search updates the user and repository state, while an unsuccessful search sets an appropriate error message.

### Testing User Interactions

The component tests use `user-event` to simulate actions such as typing into the search field and submitting the form.

This helps verify that components respond correctly to user actions instead of testing only their initial markup.

### Run the Tests

Run all tests once:

```bash
npm test
```

Run tests with coverage reporting:

```bash
npm run coverage
```

The project has six test files and 23 passing tests in the current reported test run. Test counts may change as the application evolves.

The coverage command generates a coverage report, but a coverage percentage or enforced coverage threshold has not been established in the documented CI configuration.

## GitHub Actions CI

The repository includes a GitHub Actions workflow at:

```text
.github/workflows/ci.yml
```

It automates the build and test process when code is pushed or a pull request targets the `master` or `main` branch.

### CI Workflow

```text
Git Push / Pull Request
          |
          v
  Checkout Repository
          |
          v
    Setup Node.js 20
          |
          v
    Install Dependencies
         npm ci
          |
          v
   Production Build
      npm run build
          |
          v
    Run Automated Tests
        npm test
          |
          v
      Job Result
```

### Self-Hosted Runner

The workflow uses a self-hosted Windows x64 runner:

```yaml
runs-on: [self-hosted, Windows, X64]
```

This allows CI jobs to execute on a locally managed Windows PC rather than requiring a GitHub-hosted runner.

The runner must be online and available to receive jobs.

### Checks Performed

| Check                   | Command         | Purpose                                                               |
| ----------------------- | --------------- | --------------------------------------------------------------------- |
| Dependency installation | `npm ci`        | Installs dependencies from the lockfile                               |
| Production build        | `npm run build` | Runs TypeScript project builds and creates the Vite production bundle |
| Automated tests         | `npm test`      | Runs the Vitest test suite                                            |

The project also provides an ESLint command, `npm run lint`, which can be run locally.

A green workflow indicates that the configured CI steps completed successfully. It does not, by itself, guarantee that every possible application behaviour has been tested.

## Project Structure

```text
GitHub_User_Finder/
├── .github/
│   └── workflows/
│       └── ci.yml
├── public/
├── src/
│   ├── components/
│   │   ├── SearchBar.tsx
│   │   ├── SearchBar.test.tsx
│   │   ├── UserCard.tsx
│   │   ├── UserCard.test.tsx
│   │   ├── RepoList.tsx
│   │   ├── RepoList.test.tsx
│   │   ├── RepoItem.tsx
│   │   ├── RepoItem.test.tsx
│   │   ├── LoadingState.tsx
│   │   └── ErrorMessage.tsx
│   ├── hooks/
│   │   ├── useGithubUser.ts
│   │   └── userGithubUser.test.ts
│   ├── types/
│   │   └── github.ts
│   ├── utils/
│   │   └── formatNumber.ts
│   ├── test/
│   │   ├── mock.ts
│   │   └── setup.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## Getting Started

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/) compatible with your installed Vite version.
- npm, which is included with Node.js.
- Git.

### 1. Clone the Repository

```bash
git clone https://github.com/Pranav-401/GitHub_User_Finder.git
```

### 2. Open the Project Directory

```bash
cd GitHub_User_Finder
```

### 3. Install Dependencies

```bash
npm ci
```

Using `npm ci` installs the dependencies recorded in `package-lock.json`.

### 4. Start the Development Server

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

### 5. Run Tests

```bash
npm test
```

### 6. Run Linting

```bash
npm run lint
```

### 7. Build for Production

```bash
npm run build
```

The production build is generated in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## Available Commands

| Command            | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| `npm run dev`      | Starts the Vite development server                           |
| `npm test`         | Runs the Vitest test suite once                              |
| `npm run coverage` | Runs tests with coverage reporting                           |
| `npm run lint`     | Runs ESLint                                                  |
| `npm run build`    | Runs TypeScript project builds and the Vite production build |
| `npm run preview`  | Serves the production build locally                          |

## Author

**Pranav Maurya**

Computer Engineering student interested in React, TypeScript, frontend engineering, automated testing and CI/CD.

- GitHub: [Pranav-401](https://github.com/Pranav-401)
- Project: [GitHub User Finder](https://github.com/Pranav-401/GitHub_User_Finder)

---

If you find this project useful, consider giving the repository a star.
