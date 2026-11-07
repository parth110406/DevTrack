import { useState } from 'react';
import { loadSkills, resetSkills } from '../utils/skillsStorage';
import { resetApplications } from '../utils/applicationStorage';
import { clearActivities } from '../utils/activityStorage';
import { loadProjects, saveProjects } from '../utils/projectStorage';
import './Settings.css';

export default function Settings() {
  const [theme, setTheme] = useState(() => localStorage.getItem('devtrack_theme') || 'dark');
  const [message, setMessage] = useState('');

  const applyTheme = (value) => {
    setTheme(value); localStorage.setItem('devtrack_theme', value); document.documentElement.dataset.theme = value;
    setMessage('Theme preference saved.');
  };

  const exportData = () => {
    const data = { projects: loadProjects(), skills: loadSkills(), applications: JSON.parse(localStorage.getItem('devtrack_applications') || '[]'), dsaSolved: JSON.parse(localStorage.getItem('devtrack_dsa_solved') || '{}') };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'devtrack-backup.json'; a.click(); URL.revokeObjectURL(url);
  };

  const resetDemo = () => {
    if (!window.confirm('Reset projects, skills, applications and activity to demo data?')) return;
    localStorage.removeItem('devtrack_projects'); localStorage.removeItem('devtrack_dsa_solved'); localStorage.removeItem('devtrack_notes'); localStorage.removeItem('devtrack_project_notes');
    resetSkills(); resetApplications(); clearActivities(); saveProjects(loadProjects());
    setMessage('Demo data reset. Refreshing…'); setTimeout(() => window.location.reload(), 400);
  };

  return <div className="settings-page"><header className="simple-page-header"><div><h1>Settings</h1><p>Manage appearance and local DevTrack data.</p></div></header>
    <div className="settings-grid">
      <section className="settings-card"><h2>Appearance</h2><p>Choose the interface theme.</p><div className="theme-options"><button className={theme === 'dark' ? 'selected' : ''} onClick={() => applyTheme('dark')}>Dark</button><button className={theme === 'light' ? 'selected' : ''} onClick={() => applyTheme('light')}>Light</button></div></section>
      <section className="settings-card"><h2>Data</h2><p>Your prototype stores data locally in this browser.</p><div className="settings-actions"><button onClick={exportData}>Export Data</button><button className="danger" onClick={resetDemo}>Reset Demo Data</button></div>{message && <span className="settings-message">{message}</span>}</section>
    </div>
  </div>;
}
