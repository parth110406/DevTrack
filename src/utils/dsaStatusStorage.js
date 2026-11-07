/**
 * DSA problem solved-status persistence utility — localStorage layer.
 *
 * Storage format (JSON string in localStorage):
 *   { "<problemId>": true|false, ... }
 * Problem IDs come from the stable numeric `id` field in `dsaProblems.js`
 * (integers 1‑25, stored as strings for JSON compatibility).
 *
 * This is separate from the existing `notesStorage` so that notes and
 * solved‑status can evolve independently.
 */

import { initialProblems, baselineSolved, TOTAL_PROBLEMS } from '../data/dsaProblems';

const CATEGORY_TOTALS = {
  Arrays: 50,
  Strings: 35,
  Trees: 40,
  Graphs: 35,
  'Dynamic Prog.': 45,
  'Linked Lists': 20,
  Other: 25,
};

// Baseline category totals are the original dashboard values minus the
// interactive problems already shown in the DSA list. Stack is grouped into Other.
const BASELINE_CATEGORY_SOLVED = {
  Arrays: 28,
  Strings: 22,
  Trees: 19,
  Graphs: 16,
  'Dynamic Prog.': 18,
  'Linked Lists': 12,
  Other: 11,
};

const STORAGE_KEY = 'devtrack_dsa_solved';

/** Custom event name dispatched after any solved-status change. */
export const DSA_UPDATED_EVENT = 'devtrack-dsa-updated';

/**
 * Load all saved solved-status entries from localStorage.
 * Returns a plain object keyed by problem id (string) → boolean.
 * Gracefully falls back to {} on missing or corrupt data.
 */
export function loadSolvedStatus() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    // Ensure we got a plain object, not an array or primitive
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed;
    }
    return {};
  } catch {
    // Invalid JSON or any other error — start fresh
    return {};
  }
}

/**
 * Save the full solved‑status map to localStorage.
 * Dispatches a custom event so same-tab listeners (e.g. the Dashboard)
 * can react immediately without waiting for a page refresh.
 * @param {Record<string, boolean>} statusMap
 */
export function saveSolvedStatus(statusMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(statusMap));
  } catch {
    // Storage full or unavailable — silently degrade
    console.warn('[DevTrack] Could not persist DSA solved status to localStorage.');
  }
  // Notify all same-tab listeners
  window.dispatchEvent(new Event(DSA_UPDATED_EVENT));
}

/**
 * Compute live DSA statistics from the canonical interactive list + baseline.
 * Both DSA and Dashboard use this function, so counts stay synchronized.
 */
export function getDSAStats() {
  const savedStatus = loadSolvedStatus();
  const statusFor = (p) => savedStatus[p.id] !== undefined ? savedStatus[p.id] : p.solved;

  const listSolved = (diff) => initialProblems.filter((p) => statusFor(p) && p.difficulty === diff).length;
  const easySolved = baselineSolved.Easy + listSolved('Easy');
  const mediumSolved = baselineSolved.Medium + listSolved('Medium');
  const hardSolved = baselineSolved.Hard + listSolved('Hard');
  const totalSolved = easySolved + mediumSolved + hardSolved;

  const categories = Object.entries(CATEGORY_TOTALS).map(([name, total]) => {
    const solved = BASELINE_CATEGORY_SOLVED[name] + initialProblems.filter((p) => {
      if (!statusFor(p)) return false;
      const category = p.topic === 'Stack' ? 'Other' :
        p.topic === 'Linked List' ? 'Linked Lists' :
        p.topic === 'Dynamic Programming' ? 'Dynamic Prog.' : p.topic;
      return category === name;
    }).length;
    return { name, solved, total };
  });

  return {
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    totalProblems: TOTAL_PROBLEMS,
    categories,
  };
}
