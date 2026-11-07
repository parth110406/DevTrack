import { useState, useEffect, useCallback } from 'react';
import './ProjectDetailPanel.css';

/**
 * Right-side detail panel for projects.
 * Mirrors the interaction pattern of the DSA ProblemDetailPanel:
 * overlay + slide-from-right + Escape-to-close.
 */

/* Status → CSS modifier + display label */
const statusMap = {
  'Completed':   { modifier: 'completed',   label: '✓ Completed' },
  'In Progress': { modifier: 'in-progress', label: '● In Progress' },
  'Planning':    { modifier: 'planning',    label: '○ Planning' },
};

export default function ProjectDetailPanel({
  project,
  note,
  onClose,
  onNotesChange,
  onDelete,
  onEdit,
}) {
  const isOpen = Boolean(project);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  /* ── Reset confirmation state when project changes ── */
  useEffect(() => {
    setShowDeleteConfirm(false);
  }, [project?.id]);

  /* ── Escape key closes panel (or dismiss confirmation) */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        if (showDeleteConfirm) {
          setShowDeleteConfirm(false);
        } else {
          onClose();
        }
      }
    },
    [onClose, showDeleteConfirm]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!project) {
    return (
      <>
        <div className={`proj-detail-overlay`} aria-hidden="true" />
        <aside className="proj-detail-panel" role="complementary" aria-label="Project details" />
      </>
    );
  }

  const { modifier, label } = statusMap[project.status] ?? statusMap['Planning'];

  const handleDeleteClick = () => setShowDeleteConfirm(true);
  const handleCancelDelete = () => setShowDeleteConfirm(false);
  const handleConfirmDelete = () => {
    setShowDeleteConfirm(false);
    onDelete?.(project.id);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`proj-detail-overlay ${isOpen ? 'proj-detail-overlay--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`proj-detail-panel ${isOpen ? 'proj-detail-panel--open' : ''}`}
        role="complementary"
        aria-label="Project details"
      >
        {/* Close */}
        <button
          className="proj-detail-panel__close"
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

        <div className="proj-detail-panel__body">
          {/* Title */}
          <h2 className="proj-detail-panel__title">{project.name}</h2>

          {/* Description */}
          <p className="proj-detail-panel__description">{project.description}</p>

          <hr className="proj-detail-panel__divider" />

          {/* Status */}
          <div className="proj-detail-panel__section">
            <span className="proj-detail-panel__section-label">Status</span>
            <span className={`proj-detail-panel__status-badge proj-detail-panel__status-badge--${modifier}`}>
              {label}
            </span>
          </div>

          {/* Technologies */}
          <div className="proj-detail-panel__section">
            <span className="proj-detail-panel__section-label">Technologies</span>
            <div className="proj-detail-panel__tags">
              {project.technologies.map((t) => (
                <span key={t} className="proj-detail-panel__tag">{t}</span>
              ))}
            </div>
          </div>

          <hr className="proj-detail-panel__divider" />

          {/* Progress */}
          <div className="proj-detail-panel__section">
            <div className="proj-detail-panel__progress-header">
              <span className="proj-detail-panel__section-label">Project Progress</span>
              <span className="proj-detail-panel__progress-pct">{project.progress}%</span>
            </div>
            <div className="proj-detail-panel__progress-bar">
              <div
                className={`proj-detail-panel__progress-fill proj-detail-panel__progress-fill--${modifier}`}
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>

          <hr className="proj-detail-panel__divider" />

          {/* Links */}
          <div className="proj-detail-panel__section">
            <span className="proj-detail-panel__section-label">Links</span>
            <div className="proj-detail-panel__links">
              {/* GitHub */}
              {project.github ? (
                <a
                  className="proj-detail-panel__link"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5.25 11.08c-2.92.96-2.92-1.46-4.08-1.75M9.33 12.83v-2.27a1.97 1.97 0 0 0-.55-1.53c1.83-.2 3.76-.9 3.76-4.08a3.15 3.15 0 0 0-.87-2.19 2.95 2.95 0 0 0-.06-2.2s-.7-.2-2.32.86a7.93 7.93 0 0 0-4.17 0C3.5.42 2.8.62 2.8.62a2.95 2.95 0 0 0-.06 2.2 3.15 3.15 0 0 0-.87 2.2c0 3.16 1.93 3.87 3.76 4.08a1.97 1.97 0 0 0-.55 1.52v2.27" />
                  </svg>
                  GitHub Repository ↗
                </a>
              ) : (
                <span className="proj-detail-panel__link-na">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5.25 11.08c-2.92.96-2.92-1.46-4.08-1.75M9.33 12.83v-2.27a1.97 1.97 0 0 0-.55-1.53c1.83-.2 3.76-.9 3.76-4.08a3.15 3.15 0 0 0-.87-2.19 2.95 2.95 0 0 0-.06-2.2s-.7-.2-2.32.86a7.93 7.93 0 0 0-4.17 0C3.5.42 2.8.62 2.8.62a2.95 2.95 0 0 0-.06 2.2 3.15 3.15 0 0 0-.87 2.2c0 3.16 1.93 3.87 3.76 4.08a1.97 1.97 0 0 0-.55 1.52v2.27" />
                  </svg>
                  GitHub — Not added
                </span>
              )}

              {/* Live Demo */}
              {project.liveDemo ? (
                <a
                  className="proj-detail-panel__link"
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="7" cy="7" r="5.5" />
                    <line x1="1.5" y1="7" x2="12.5" y2="7" />
                    <path d="M7 1.5a8.5 8.5 0 0 1 2.2 5.5A8.5 8.5 0 0 1 7 12.5a8.5 8.5 0 0 1-2.2-5.5A8.5 8.5 0 0 1 7 1.5Z" />
                  </svg>
                  Live Demo ↗
                </a>
              ) : (
                <span className="proj-detail-panel__link-na">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="7" cy="7" r="5.5" />
                    <line x1="1.5" y1="7" x2="12.5" y2="7" />
                    <path d="M7 1.5a8.5 8.5 0 0 1 2.2 5.5A8.5 8.5 0 0 1 7 12.5a8.5 8.5 0 0 1-2.2-5.5A8.5 8.5 0 0 1 7 1.5Z" />
                  </svg>
                  Live Demo — Not added
                </span>
              )}
            </div>
          </div>

          <hr className="proj-detail-panel__divider" />

          {/* Notes */}
          <div>
            <label
              className="proj-detail-panel__notes-heading"
              htmlFor={`proj-notes-${project.id}`}
            >
              Your Notes
            </label>
            <textarea
              id={`proj-notes-${project.id}`}
              className="proj-detail-panel__notes-textarea"
              placeholder="Write your thoughts, next steps, or blockers..."
              value={note}
              onChange={(e) => onNotesChange(project.id, e.target.value)}
            />
          </div>

          {/* Action buttons */}
          <div className="proj-detail-panel__actions">
            {/* Edit Project — opens edit modal with current project data */}
            <button
              className="proj-detail-panel__edit-btn"
              onClick={() => onEdit?.(project)}
            >
              Edit Project
            </button>

            {/* Delete Project */}
            <button
              className="proj-detail-panel__delete-btn"
              onClick={handleDeleteClick}
            >
              Delete Project
            </button>
          </div>
        </div>

        {/* Delete confirmation dialog */}
        {showDeleteConfirm && (
          <div className="proj-detail-panel__confirm-overlay" onClick={handleCancelDelete}>
            <div
              className="proj-detail-panel__confirm-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="proj-detail-panel__confirm-title">Delete Project?</h3>
              <p className="proj-detail-panel__confirm-text">
                Are you sure you want to delete
                <strong> &ldquo;{project.name}&rdquo;</strong>?
              </p>
              <p className="proj-detail-panel__confirm-warning">
                This action cannot be undone.
              </p>
              <div className="proj-detail-panel__confirm-actions">
                <button
                  className="proj-detail-panel__confirm-cancel"
                  onClick={handleCancelDelete}
                >
                  Cancel
                </button>
                <button
                  className="proj-detail-panel__confirm-delete"
                  onClick={handleConfirmDelete}
                >
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
