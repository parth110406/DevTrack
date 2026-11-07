import { useEffect, useCallback } from 'react';
import './ProblemDetailPanel.css';

export default function ProblemDetailPanel({
  problem,
  onClose,
  onToggle,
  onNotesChange,
}) {
  const isOpen = Boolean(problem);

  /* ── Escape key closes panel ────────────────────── */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  const diffClass = problem
    ? `detail-panel__difficulty--${problem.difficulty.toLowerCase()}`
    : '';

  return (
    <>
      {/* Overlay */}
      <div
        className={`detail-overlay ${isOpen ? 'detail-overlay--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`detail-panel ${isOpen ? 'detail-panel--open' : ''}`}
        role="complementary"
        aria-label="Problem details"
      >
        {problem && (
          <>
            {/* Close */}
            <button
              className="detail-panel__close"
              onClick={onClose}
              aria-label="Close detail panel"
              title="Close"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="4" x2="12" y2="12" />
                <line x1="12" y1="4" x2="4" y2="12" />
              </svg>
            </button>

            <div className="detail-panel__body">
              {/* Title */}
              <h2 className="detail-panel__title">{problem.title}</h2>

              {/* Difficulty · Topic */}
              <div className="detail-panel__meta">
                <span className={`detail-panel__difficulty ${diffClass}`}>
                  {problem.difficulty}
                </span>
                <span className="detail-panel__separator">·</span>
                <span className="detail-panel__topic">{problem.topic}</span>
              </div>

              {/* Description */}
              <p className="detail-panel__description">{problem.description}</p>

              <hr className="detail-panel__divider" />

              {/* Status */}
              <div className="detail-panel__status-section">
                <span className="detail-panel__status-label">Status</span>
                <button
                  className={`detail-panel__status-badge ${
                    problem.solved
                      ? 'detail-panel__status-badge--solved'
                      : 'detail-panel__status-badge--unsolved'
                  }`}
                  onClick={() => onToggle(problem.id)}
                  aria-label={
                    problem.solved ? 'Mark as unsolved' : 'Mark as solved'
                  }
                >
                  {problem.solved ? '✓ Solved' : '○ Not solved'}
                </button>
              </div>

              <hr className="detail-panel__divider" />

              {/* Notes */}
              <div>
                <label
                  className="detail-panel__notes-heading"
                  htmlFor={`notes-${problem.id}`}
                >
                  Your Notes
                </label>
                <textarea
                  id={`notes-${problem.id}`}
                  className="detail-panel__notes-textarea"
                  placeholder="Write your approach, mistakes, or key insight..."
                  value={problem.notes}
                  onChange={(e) => onNotesChange(problem.id, e.target.value)}
                />
              </div>

              {/* External link */}
              <a
                className="detail-panel__link-btn"
                href={problem.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Problem ↗
              </a>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
