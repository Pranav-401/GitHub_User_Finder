import type { GithubRepo } from "../types/github";

interface Props {
  repo: GithubRepo;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Java: "#b07219",
  Ruby: "#701516",
  Swift: "#F05138",
};

export default function RepoItem({ repo }: Props) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="repo-item"
      aria-label={`Repository: ${repo.name}`}
    >
      <div className="repo-header">
        <svg
          className="repo-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
        <span className="repo-name">{repo.name}</span>
      </div>

      {repo.description ? (
        <p className="repo-description">{repo.description}</p>
      ) : (
        <p className="repo-description no-description">
          No description provided
        </p>
      )}

      <div className="repo-footer">
        {repo.language && (
          <span className="repo-language">
            <span
              className="language-dot"
              style={{
                backgroundColor: LANGUAGE_COLORS[repo.language] ?? "#8b8b8b",
              }}
            />
            {repo.language}
          </span>
        )}
        <span className="repo-stars">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="star-icon"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          {repo.stargazers_count}
        </span>
      </div>
    </a>
  );
}
