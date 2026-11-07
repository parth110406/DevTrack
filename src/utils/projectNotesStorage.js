/**
 * Project notes persistence utility — localStorage layer.
 *
 * This is temporary persistence for the prototype phase.
 * It will be replaced by a backend API + MongoDB in a future iteration.
 *
 * Storage format (JSON string in localStorage):
 *   { "<projectId>": "<note text>", ... }
 *
 * Project IDs are stable strings defined in projectData.js
 * (e.g. "devtrack", "devtrack-api"), NOT array indexes.
 */

const STORAGE_KEY = 'devtrack_project_notes';

/**
 * Load all saved project notes from localStorage.
 * Returns a plain object keyed by project id → note string.
 * Gracefully falls back to {} on missing or corrupt data.
 */
export function loadProjectNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed;
    }
    return {};
  } catch {
    return {};
  }
}

/**
 * Save the full project notes map to localStorage.
 * @param {Record<string, string>} notesMap
 */
export function saveProjectNotes(notesMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notesMap));
  } catch {
    console.warn('[DevTrack] Could not persist project notes to localStorage.');
  }
}
