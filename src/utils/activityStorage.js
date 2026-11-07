import { recentActivity as seedActivity } from '../data/mockData';

const STORAGE_KEY = 'devtrack_activity';
export const ACTIVITY_UPDATED_EVENT = 'devtrack-activity-updated';

export function loadActivities() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...seedActivity];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [...seedActivity];
  } catch {
    return [...seedActivity];
  }
}

export function saveActivities(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, 20)));
  } catch {
    console.warn('[DevTrack] Could not persist activity.');
  }
  window.dispatchEvent(new Event(ACTIVITY_UPDATED_EVENT));
}

export function addActivity(action, category = 'system') {
  const current = loadActivities();
  const item = {
    id: `activity-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    action,
    category,
    timestamp: 'Just now',
  };
  saveActivities([item, ...current]);
  return item;
}

export function clearActivities() {
  saveActivities([]);
}
