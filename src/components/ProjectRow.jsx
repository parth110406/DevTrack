import './ProjectRow.css';

/**
 * Single project row — compact, professional layout.
 * Mirrors the visual density of DSAProblemRow.
 */

/* Status → CSS modifier + label */
const statusMap = {
  'Completed':   { modifier: 'completed',   label: '✓ Completed' },
  'In Progress': { modifier: 'in-progress', label: '● In Progress' },
  'Planning':    { modifier: 'planning',    label: '○ Planning' },
};

export default function ProjectRow({ project, onSelect }) {
  const { modifier, label } = statusMap[project.status] ?? statusMap['Planning'];

  return (
    <div className="proj-row" onClick={() => onSelect(project)}>
      {/* Icon / avatar */}
      <span className="proj-row__icon" aria-hidden="true">
        {project.name.charAt(0)}
      </span>

      {/* Name + description */}
      <div className="proj-row__info">
        <span className="proj-row__name">{project.name}</span>
        <span className="proj-row__desc">{project.description}</span>
      </div>

      {/* Tech tags */}
      <div className="proj-row__tags">
        {project.technologies.map((t) => (
          <span key={t} className="proj-row__tag">{t}</span>
        ))}
      </div>

      {/* Status */}
      <span className={`proj-row__status proj-row__status--${modifier}`}>
        {label}
      </span>

      {/* Progress */}
      <div className="proj-row__progress">
        <div className="proj-row__progress-bar">
          <div
            className={`proj-row__progress-fill proj-row__progress-fill--${modifier}`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <span className="proj-row__progress-pct">{project.progress}%</span>
      </div>

      {/* Updated */}
      <span className="proj-row__updated">{project.updatedAt}</span>

      {/* Open arrow */}
      <span className="proj-row__arrow" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="5 3 9 7 5 11" />
        </svg>
      </span>
    </div>
  );
}
