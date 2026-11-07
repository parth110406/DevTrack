/**
 * Notes persistence utility — localStorage layer.
 *
 * This is temporary persistence for the prototype phase.
 * It will be replaced by a backend API + MongoDB in a future iteration.
 *
 * Storage format (JSON string in localStorage):
 *   { "<problemId>": "<note text>", ... }
 *
 * Problem IDs come from the existing numeric `id` field in dsaProblems.js
 * (stable, not array-index-based).
 */

const STORAGE_KEY = 'devtrack_problem_notes';

/**
 * Load all saved notes from localStorage.
 * Returns a plain object keyed by problem id → note string.
 * Gracefully falls back to {} on missing or corrupt data.
 */
export function loadNotes() {
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
 * Save the full notes map to localStorage.
 * @param {Record<string|number, string>} notesMap
 */
export function saveNotes(notesMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notesMap));
  } catch {
    // Storage full or unavailable — silently degrade
    console.warn('[DevTrack] Could not persist notes to localStorage.');
  }
}
