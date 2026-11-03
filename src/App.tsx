import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import RepoList from "./components/RepoList";
import ErrorMessage from "./components/ErrorMessage";
import LoadingState from "./components/LoadingState";
import { useGithubUser } from "./hooks/useGithubUser";
import "./App.css";

export default function App() {
  const { user, repos, loading, error, searchUser, reset } = useGithubUser();

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="header-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </div>
          <h1 className="header-title">GitHub User Finder</h1>
        </header>

        <SearchBar onSearch={searchUser} loading={loading} />

        <main className="main-content">
          {loading && <LoadingState />}

          {error && !loading && (
            <ErrorMessage message={error} onRetry={reset} />
          )}

          {user && !loading && !error && (
            <>
              <UserCard user={user} />
              <RepoList repos={repos} />
            </>
          )}

          {!user && !loading && !error && (
            <div className="empty-state">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="empty-state-icon"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <p>Search for a GitHub user to get started</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
