import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { initialProblems } from '../data/dsaProblems';
import { loadNotes, saveNotes } from '../utils/notesStorage';
import { loadSolvedStatus, saveSolvedStatus, getDSAStats } from '../utils/dsaStatusStorage';
import { addActivity } from '../utils/activityStorage';
import DSAStats from '../components/DSAStats';
import DSAFilters from '../components/DSAFilters';
import DSAProblemList from '../components/DSAProblemList';
import ProblemDetailPanel from '../components/ProblemDetailPanel';
import './DSA.css';

export default function DSA() {
  /* ── Persisted notes (localStorage — temporary, will move to backend) */
  const notesRef = useRef(loadNotes());

  /* ── State ────────────────────────────────────────── */
  const [problems, setProblems] = useState(() => {
    const savedStatus = loadSolvedStatus();
    const saved = notesRef.current;
    return initialProblems.map((p) => ({
      ...p,
      solved: savedStatus[p.id] !== undefined ? savedStatus[p.id] : p.solved,
      notes: saved[p.id] !== undefined ? saved[p.id] : p.notes,
    }));
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  /* ── Toggle solved / unsolved ─────────────────────── */
  const handleToggle = (id) => {
    const problem = problems.find((p) => p.id === id);
    if (!problem) return;
    const newStatus = !problem.solved;
    const statusMap = loadSolvedStatus();
    statusMap[id] = newStatus;
    saveSolvedStatus(statusMap);
    addActivity(`${newStatus ? 'Solved' : 'Reopened'} \"${problem.title}\"`, 'dsa');
    setProblems((prev) => prev.map((p) => (p.id === id ? { ...p, solved: newStatus } : p)));
  };

  /* ── Notes update (persisted to localStorage) ────── */
  const handleNotesChange = useCallback((id, notes) => {
    setProblems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, notes } : p))
    );
    // Update the notes map and persist
    notesRef.current = { ...notesRef.current, [id]: notes };
    saveNotes(notesRef.current);
  }, []);

  /* ── Select / close problem ──────────────────────── */
  const handleSelect = useCallback((problem) => {
    setSelectedProblemId(problem.id);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedProblemId(null);
  }, []);

  /* ── Derived: selected problem from single source ── */
  const selectedProblem = useMemo(
    () => (selectedProblemId ? problems.find((p) => p.id === selectedProblemId) : null),
    [problems, selectedProblemId]
  );

  /* ── Derived: unique topics ──────────────────────── */
  const topics = useMemo(
    () => [...new Set(problems.map((p) => p.topic))].sort(),
    [problems]
  );

  /* ── Derived: filtered problems ──────────────────── */
  const filteredProblems = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return problems.filter((p) => {
      if (query && !p.title.toLowerCase().includes(query)) return false;
      if (selectedTopic && p.topic !== selectedTopic) return false;
      if (selectedDifficulty && p.difficulty !== selectedDifficulty) return false;
      if (selectedStatus === 'solved' && !p.solved) return false;
      if (selectedStatus === 'unsolved' && p.solved) return false;
      return true;
    });
  }, [problems, searchQuery, selectedTopic, selectedDifficulty, selectedStatus]);

  /* ── Derived: stats — shared with Dashboard ───────── */
  const stats = getDSAStats();
  const { totalSolved, easySolved, mediumSolved, hardSolved, totalProblems } = stats;
  const percentage = ((totalSolved / totalProblems) * 100).toFixed(1);

  /* ── Render ──────────────────────────────────────── */
  return (
    <div className="dsa-page">
      {/* Header */}
      <header className="page-header">
        <div className="page-header__left">
          <h1 className="page-header__title">DSA</h1>
          <p className="page-header__subtitle">Track your problem-solving progress.</p>
        </div>
      </header>

      {/* Stats */}
      <DSAStats
        totalSolved={totalSolved}
        easySolved={easySolved}
        mediumSolved={mediumSolved}
        hardSolved={hardSolved}
      />

      {/* Overall progress */}
      <div className="dsa-page__progress-card">
        <div className="dsa-page__progress-header">
          <span className="dsa-page__progress-label">Overall Progress</span>
          <span className="dsa-page__progress-pct">{percentage}% complete</span>
        </div>
        <div className="dsa-page__progress-bar">
          <div
            className="dsa-page__progress-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="dsa-page__progress-count">
          {totalSolved} / {totalProblems} solved
        </span>
      </div>

      {/* Filters */}
      <DSAFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedTopic={selectedTopic}
        onTopicChange={setSelectedTopic}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={setSelectedDifficulty}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        topics={topics}
      />

      {/* Problem list */}
      <DSAProblemList
        problems={filteredProblems}
        onToggle={handleToggle}
        onSelect={handleSelect}
      />

      {/* Detail panel */}
      <ProblemDetailPanel
        problem={selectedProblem}
        onClose={handleClosePanel}
        onToggle={handleToggle}
        onNotesChange={handleNotesChange}
      />
    </div>
  );
}
