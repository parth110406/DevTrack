import './DSAFilters.css';

export default function DSAFilters({
  searchQuery,
  onSearchChange,
  selectedTopic,
  onTopicChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedStatus,
  onStatusChange,
  topics,
}) {
  return (
    <div className="dsa-filters">
      <div className="dsa-filters__search">
        <svg
          className="dsa-filters__search-icon"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="6" cy="6" r="4.5" />
          <line x1="9.2" y1="9.2" x2="12.5" y2="12.5" />
        </svg>
        <input
          id="dsa-search"
          type="text"
          className="dsa-filters__input"
          placeholder="Search problems..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="dsa-filters__selects">
        <select
          id="dsa-filter-topic"
          className="dsa-filters__select"
          value={selectedTopic}
          onChange={(e) => onTopicChange(e.target.value)}
        >
          <option value="">All Topics</option>
          {topics.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select
          id="dsa-filter-difficulty"
          className="dsa-filters__select"
          value={selectedDifficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
        >
          <option value="">All Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <select
          id="dsa-filter-status"
          className="dsa-filters__select"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="solved">Solved</option>
          <option value="unsolved">Unsolved</option>
        </select>
      </div>
    </div>
  );
}
