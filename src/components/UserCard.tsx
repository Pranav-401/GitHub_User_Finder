import type { GithubUser } from "../types/github";
import { formatNumber } from "../utils/formatNumber";

interface Props {
  user: GithubUser;
}

export default function UserCard({ user }: Props) {
  return (
    <div className="user-card">
      <div className="user-card-header">
        <img
          src={user.avatar_url}
          alt={`${user.login}'s avatar`}
          className="avatar"
        />
        <div className="user-info">
          {user.name && <h2 className="user-name">{user.name}</h2>}
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="user-login"
          >
            @{user.login}
          </a>
          {user.bio && <p className="user-bio">{user.bio}</p>}
          {user.location && (
            <p className="user-location">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="location-icon"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {user.location}
            </p>
          )}
        </div>
      </div>

      <div className="user-stats">
        <div className="stat">
          <span className="stat-value">{formatNumber(user.public_repos)}</span>
          <span className="stat-label">Repos</span>
        </div>
        <div className="stat">
          <span className="stat-value">{formatNumber(user.followers)}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat">
          <span className="stat-value">{formatNumber(user.following)}</span>
          <span className="stat-label">Following</span>
        </div>
      </div>
    </div>
  );
}
