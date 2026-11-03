import { useState } from "react";
import type { GithubRepo, GithubUser } from "../types/github";

interface UseGithubUserReturn {
  user: GithubUser | null;
  repos: GithubRepo[];
  loading: boolean;
  error: string | null;
  searchUser: (username: string) => Promise<void>;
  reset: () => void;
}

export function useGithubUser(): UseGithubUserReturn {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUser = async (username: string) => {
    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);

    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);

      if (userRes.status === 404) {
        setError(`User "${username}" not found on GitHub.`);
        return;
      }

      if (!userRes.ok) {
        setError("Something went wrong. Please try again.");
        return;
      }

      const userData: GithubUser = await userRes.json();
      setUser(userData);

      const reposRes = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
      );
      const reposData: GithubRepo[] = await reposRes.json();
      setRepos(reposData);
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setUser(null);
    setRepos([]);
    setError(null);
    setLoading(false);
  };

  return { user, repos, loading, error, searchUser, reset };
}
