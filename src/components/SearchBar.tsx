import { useState } from "react";

interface Props {
  onSearch: (username: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: Props) {
  const [input, setInput] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      setValidationError("Please enter a GitHub username.");
      return;
    }
    setValidationError("");
    onSearch(input.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (validationError) setValidationError("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-input-wrapper">
        <svg
          className="search-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search GitHub username..."
          aria-label="GitHub username"
          className={`search-input ${validationError ? "input-error" : ""}`}
          disabled={loading}
        />
        {input && (
          <button
            type="button"
            className="clear-btn"
            onClick={() => {
              setInput("");
              setValidationError("");
            }}
            aria-label="Clear input"
          >
            ×
          </button>
        )}
        {validationError && (
          <p className="validation-error" role="alert">
            {validationError}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="search-btn"
        disabled={loading}
        aria-label="Search"
      >
        {loading ? <span className="spinner" /> : "Search"}
      </button>
    </form>
  );
}
