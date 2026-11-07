import DSAProblemRow from './DSAProblemRow';
import './DSAProblemList.css';

export default function DSAProblemList({ problems, onToggle, onSelect }) {
  if (problems.length === 0) {
    return (
      <div className="dsa-list dsa-list--empty">
        <p className="dsa-list__empty-title">No problems found</p>
        <p className="dsa-list__empty-sub">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="dsa-list">
      <div className="dsa-list__header">
        <span className="dsa-list__header-cell dsa-list__header-cell--status" />
        <span className="dsa-list__header-cell dsa-list__header-cell--title">Problem</span>
        <span className="dsa-list__header-cell dsa-list__header-cell--diff">Difficulty</span>
        <span className="dsa-list__header-cell dsa-list__header-cell--topic">Topic</span>
      </div>

      {problems.map((p) => (
        <DSAProblemRow key={p.id} problem={p} onToggle={onToggle} onSelect={onSelect} />
      ))}
    </div>
  );
}

