const STORAGE_KEY = 'devtrack_skills';
export const SKILLS_UPDATED_EVENT = 'devtrack-skills-updated';

const DEFAULT_SKILLS = [
  { id: 'javascript', name: 'JavaScript', category: 'Frontend', level: 70 },
  { id: 'react', name: 'React', category: 'Frontend', level: 80 },
  { id: 'html-css', name: 'HTML / CSS', category: 'Frontend', level: 90 },
  { id: 'node', name: 'Node.js', category: 'Backend', level: 60 },
  { id: 'express', name: 'Express', category: 'Backend', level: 55 },
  { id: 'sql', name: 'SQL', category: 'Database', level: 50 },
  { id: 'mongodb', name: 'MongoDB', category: 'Database', level: 60 },
  { id: 'python', name: 'Python', category: 'AI / ML', level: 70 },
];

export function loadSkills() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...DEFAULT_SKILLS];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [...DEFAULT_SKILLS];
  } catch {
    return [...DEFAULT_SKILLS];
  }
}

export function saveSkills(skills) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
  window.dispatchEvent(new Event(SKILLS_UPDATED_EVENT));
}

export function resetSkills() {
  saveSkills([...DEFAULT_SKILLS]);
}
