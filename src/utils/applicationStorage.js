const STORAGE_KEY = 'devtrack_applications';
export const APPLICATIONS_UPDATED_EVENT = 'devtrack-applications-updated';

const DEFAULT_APPLICATIONS = [
  { id: 'app-1', company: 'Stripe', role: 'Frontend Engineer', status: 'Applied', date: '2026-09-18', location: 'Remote', url: '' },
  { id: 'app-2', company: 'Vercel', role: 'Software Engineer', status: 'Interview', date: '2026-09-17', location: 'Remote', url: '' },
  { id: 'app-3', company: 'Microsoft', role: 'SWE Intern', status: 'Applied', date: '2026-09-15', location: 'Bengaluru', url: '' },
  { id: 'app-4', company: 'Amazon', role: 'SDE Intern', status: 'Rejected', date: '2026-09-12', location: 'Bengaluru', url: '' },
];

export function loadApplications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...DEFAULT_APPLICATIONS];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [...DEFAULT_APPLICATIONS];
  } catch {
    return [...DEFAULT_APPLICATIONS];
  }
}

export function saveApplications(applications) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  window.dispatchEvent(new Event(APPLICATIONS_UPDATED_EVENT));
}

export function createApplication(data, current = loadApplications()) {
  const item = {
    id: `app-${Date.now()}`,
    company: data.company.trim(),
    role: data.role.trim(),
    status: data.status,
    date: data.date || new Date().toISOString().slice(0, 10),
    location: data.location?.trim() || '—',
    url: data.url?.trim() || '',
  };
  const next = [item, ...current];
  saveApplications(next);
  return { applications: next, application: item };
}

export function updateApplication(data, current = loadApplications()) {
  const next = current.map((item) => item.id === data.id ? { ...item, ...data } : item);
  saveApplications(next);
  return next;
}

export function deleteApplication(id, current = loadApplications()) {
  const next = current.filter((item) => item.id !== id);
  saveApplications(next);
  return next;
}

export function resetApplications() {
  saveApplications([...DEFAULT_APPLICATIONS]);
}
