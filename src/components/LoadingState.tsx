export default function LoadingState() {
  return (
    <div className="loading-container" aria-label="Loading">
      <div className="loading-card">
        <div className="skeleton skeleton-avatar" />
        <div className="skeleton-info">
          <div className="skeleton skeleton-name" />
          <div className="skeleton skeleton-login" />
          <div className="skeleton skeleton-bio" />
        </div>
      </div>
      <div className="skeleton-stats">
        <div className="skeleton skeleton-stat" />
        <div className="skeleton skeleton-stat" />
        <div className="skeleton skeleton-stat" />
      </div>
      <div className="skeleton-repos">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton skeleton-repo" />
        ))}
      </div>
    </div>
  );
}
