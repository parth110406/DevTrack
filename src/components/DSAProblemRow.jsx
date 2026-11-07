import './DSAProblemRow.css';

export default function DSAProblemRow({ problem, onToggle, onSelect }) {
  const diffClass = `dsa-row__difficulty--${problem.difficulty.toLowerCase()}`;

  return (
    <div className="dsa-row">
      <button
        className={`dsa-row__toggle ${problem.solved ? 'dsa-row__toggle--solved' : ''}`}
        onClick={() => onToggle(problem.id)}
        aria-label={problem.solved ? 'Mark as unsolved' : 'Mark as solved'}
        title={problem.solved ? 'Solved — click to undo' : 'Unsolved — click to mark solved'}
      >
        {problem.solved ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 7.5 6 10.5 11 4" />
          </svg>
        ) : (
          <span className="dsa-row__circle" />
        )}
      </button>

      <button
        className={`dsa-row__title ${problem.solved ? 'dsa-row__title--solved' : ''}`}
        onClick={() => onSelect(problem)}
        title={`View details for ${problem.title}`}
      >
        {problem.title}
      </button>

      <span className={`dsa-row__difficulty ${diffClass}`}>
        {problem.difficulty}
      </span>

      <span className="dsa-row__topic">
        {problem.topic}
      </span>
    </div>
  );
}
