import { useState, useCallback } from 'react';
import './NewProjectModal.css';

/**
 * Validates a URL string — must be http:// or https://.
 * Returns true if valid or empty (optional field).
 */
function isValidUrl(str) {
  if (!str || !str.trim()) return true; // optional
  try {
    const url = new URL(str.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

const INITIAL_FORM = {
  name: '',
  description: '',
  technologies: [],
  status: 'Planning',
  progress: 0,
  github: '',
  liveDemo: '',
  notes: '',
};

export default function NewProjectModal({ onClose, onCreate, onUpdate, project: editProject }) {
  const [form, setForm] = useState(() => {
    if (editProject) {
      return {
        id: editProject.id,
        name: editProject.name,
        description: editProject.description,
        technologies: [...editProject.technologies],
        status: editProject.status,
        progress: editProject.progress,
        github: editProject.github ?? '',
        liveDemo: editProject.liveDemo ?? '',
        notes: '',
      };
    }
    return { ...INITIAL_FORM };
  });
  const [techInput, setTechInput] = useState('');
  const [errors, setErrors] = useState({});

  /* ── Field change helper ────────────────────────── */
  const handleChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear field error on edit
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

    /* ── Modal close ─────────────────────────────────── */
  const handleModalClose = useCallback(() => {
    onClose();
  }, [onClose]);

  /* ── Technology add ──────────────────────────────── */
  const addTech = useCallback(() => {
    const val = techInput.trim();
    if (!val) return;
    setForm((prev) => {
      if (prev.technologies.some((t) => t.toLowerCase() === val.toLowerCase())) {
        return prev; // duplicate — skip
      }
      return { ...prev, technologies: [...prev.technologies, val] };
    });
    setTechInput('');
  }, [techInput]);

  const handleTechKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addTech();
      }
    },
    [addTech]
  );

  const removeTech = useCallback((tech) => {
    setForm((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  }, []);

  /* ── Validation ──────────────────────────────────── */
  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Project name is required.';
    if (!form.description.trim()) errs.description = 'Description is required.';
    if (form.progress < 0 || form.progress > 100) errs.progress = 'Must be 0–100.';
    if (!isValidUrl(form.github)) errs.github = 'Enter a valid http:// or https:// URL.';
    if (!isValidUrl(form.liveDemo)) errs.liveDemo = 'Enter a valid http:// or https:// URL.';
    return errs;
  };

  /* ── Submit ──────────────────────────────────────── */
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (editProject) {
      onUpdate?.(form);
    } else {
      onCreate?.(form);
    }
  };

  /* ── Progress change — clamp 0‑100 ──────────────── */
  const handleProgressChange = (e) => {
    const raw = e.target.value;
    if (raw === '') {
      handleChange('progress', 0);
      return;
    }
    const num = Math.max(0, Math.min(100, parseInt(raw, 10) || 0));
    handleChange('progress', num);
  };

  return (
    <>
      {/* Overlay — does NOT close modal to prevent accidental data loss */}
      <div className="npm-overlay" aria-hidden="true" />

      <div className="npm-modal" role="dialog" aria-label={editProject ? 'Edit Project' : 'Create Project'}>
        {/* Header */}
        <div className="npm-modal__header">
          <h2 className="npm-modal__title">{editProject ? 'Edit Project' : 'Create Project'}</h2>
          <button
            className="npm-modal__close"
            onClick={handleModalClose}
            aria-label="Close"
            title="Close"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="4" x2="12" y2="12" />
              <line x1="12" y1="4" x2="4" y2="12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form className="npm-modal__form" onSubmit={handleSubmit} noValidate>
          {/* Project Name */}
          <div className="npm-field">
            <label className="npm-field__label" htmlFor="npm-name">
              Project Name <span className="npm-field__req">*</span>
            </label>
            <input
              id="npm-name"
              type="text"
              className={`npm-field__input ${errors.name ? 'npm-field__input--error' : ''}`}
              placeholder="My Awesome Project"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              autoFocus
            />
            {errors.name && <span className="npm-field__error">{errors.name}</span>}
          </div>

          {/* Description */}
          <div className="npm-field">
            <label className="npm-field__label" htmlFor="npm-desc">
              Description <span className="npm-field__req">*</span>
            </label>
            <textarea
              id="npm-desc"
              className={`npm-field__textarea ${errors.description ? 'npm-field__input--error' : ''}`}
              placeholder="What does this project do?"
              rows={3}
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
            {errors.description && <span className="npm-field__error">{errors.description}</span>}
          </div>

          {/* Technologies */}
          <div className="npm-field">
            <label className="npm-field__label" htmlFor="npm-tech">
              Technologies
            </label>
            <div className="npm-field__tech-row">
              <input
                id="npm-tech"
                type="text"
                className="npm-field__input npm-field__input--tech"
                placeholder="e.g. React"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={handleTechKeyDown}
              />
              <button
                type="button"
                className="npm-field__add-btn"
                onClick={addTech}
              >
                Add
              </button>
            </div>
            {form.technologies.length > 0 && (
              <div className="npm-field__tags">
                {form.technologies.map((t) => (
                  <span key={t} className="npm-field__tag">
                    {t}
                    <button
                      type="button"
                      className="npm-field__tag-remove"
                      onClick={() => removeTech(t)}
                      aria-label={`Remove ${t}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Status + Progress row */}
          <div className="npm-field__row">
            <div className="npm-field npm-field--half">
              <label className="npm-field__label" htmlFor="npm-status">
                Status
              </label>
              <select
                id="npm-status"
                className="npm-field__select"
                value={form.status}
                onChange={(e) => handleChange('status', e.target.value)}
              >
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>

            <div className="npm-field npm-field--half">
              <label className="npm-field__label" htmlFor="npm-progress">
                Progress
              </label>
              <div className="npm-field__progress-row">
                <input
                  id="npm-progress"
                  type="number"
                  className={`npm-field__input npm-field__input--progress ${errors.progress ? 'npm-field__input--error' : ''}`}
                  min={0}
                  max={100}
                  value={form.progress}
                  onChange={handleProgressChange}
                />
                <span className="npm-field__pct">%</span>
              </div>
              {errors.progress && <span className="npm-field__error">{errors.progress}</span>}
            </div>
          </div>

          {/* GitHub */}
          <div className="npm-field">
            <label className="npm-field__label" htmlFor="npm-github">
              GitHub Repository
            </label>
            <input
              id="npm-github"
              type="url"
              className={`npm-field__input ${errors.github ? 'npm-field__input--error' : ''}`}
              placeholder="https://github.com/..."
              value={form.github}
              onChange={(e) => handleChange('github', e.target.value)}
            />
            {errors.github && <span className="npm-field__error">{errors.github}</span>}
          </div>

          {/* Live Demo */}
          <div className="npm-field">
            <label className="npm-field__label" htmlFor="npm-live">
              Live Demo
            </label>
            <input
              id="npm-live"
              type="url"
              className={`npm-field__input ${errors.liveDemo ? 'npm-field__input--error' : ''}`}
              placeholder="https://..."
              value={form.liveDemo}
              onChange={(e) => handleChange('liveDemo', e.target.value)}
            />
            {errors.liveDemo && <span className="npm-field__error">{errors.liveDemo}</span>}
          </div>

          {/* Notes */}
          <div className="npm-field">
            <label className="npm-field__label" htmlFor="npm-notes">
              Project Notes
            </label>
            <textarea
              id="npm-notes"
              className="npm-field__textarea"
              placeholder="Write your thoughts, next steps, or blockers..."
              rows={3}
              value={form.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="npm-modal__actions">
            <button
              type="button"
              className="npm-modal__cancel-btn"
              onClick={handleModalClose}
            >
              Cancel
            </button>
            <button type="submit" className="npm-modal__create-btn">
              {editProject ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
