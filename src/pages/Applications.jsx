import { useMemo, useState } from 'react';
import { loadApplications, createApplication, updateApplication, deleteApplication } from '../utils/applicationStorage';
import { addActivity } from '../utils/activityStorage';
import './Applications.css';

const EMPTY = { company: '', role: '', status: 'Applied', date: new Date().toISOString().slice(0, 10), location: '', url: '' };

export default function Applications() {
  const [applications, setApplications] = useState(() => loadApplications());
  const [filter, setFilter] = useState('');
  const [query, setQuery] = useState('');
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => applications.filter((a) => {
    const q = query.toLowerCase();
    return (!filter || a.status === filter) && (!q || `${a.company} ${a.role}`.toLowerCase().includes(q));
  }), [applications, filter, query]);

  const submit = (e) => {
    e.preventDefault();
    if (!form.company.trim() || !form.role.trim()) return;
    if (editing) {
      const next = updateApplication({ ...form, id: editing }, applications);
      setApplications(next); addActivity(`Updated application at "${form.company}"`, 'application');
    } else {
      const result = createApplication(form, applications);
      setApplications(result.applications); addActivity(`Applied to ${result.application.role} at ${result.application.company}`, 'application');
    }
    setForm(EMPTY); setEditing(null);
  };

  const edit = (app) => { setEditing(app.id); setForm({ ...app }); };
  const remove = (app) => { setApplications(deleteApplication(app.id, applications)); addActivity(`Removed application at "${app.company}"`, 'application'); };

  return (
    <div className="applications-page">
      <header className="simple-page-header"><div><h1>Applications</h1><p>Keep your job and internship pipeline organized.</p></div><span className="application-count">{applications.length} total</span></header>
      <form className="application-form" onSubmit={submit}>
        <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        <input placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Applied</option><option>Interview</option><option>Offer</option><option>Rejected</option><option>Withdrawn</option></select>
        <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        <button type="submit">{editing ? 'Update' : '+ Add Application'}</button>
        {editing && <button type="button" className="button-muted" onClick={() => { setEditing(null); setForm(EMPTY); }}>Cancel</button>}
      </form>
      <div className="applications-toolbar"><input placeholder="Search company or role..." value={query} onChange={(e) => setQuery(e.target.value)} /><select value={filter} onChange={(e) => setFilter(e.target.value)}><option value="">All Status</option><option>Applied</option><option>Interview</option><option>Offer</option><option>Rejected</option><option>Withdrawn</option></select></div>
      <section className="applications-table">
        <div className="applications-table__head"><span>Company / Role</span><span>Status</span><span>Date</span><span>Location</span><span /></div>
        {filtered.length ? filtered.map((app) => <div className="applications-table__row" key={app.id}><div><strong>{app.company}</strong><small>{app.role}</small></div><span className={`status-pill status-${app.status.toLowerCase()}`}>{app.status}</span><span>{app.date}</span><span>{app.location}</span><div className="row-actions"><button onClick={() => edit(app)}>Edit</button><button onClick={() => remove(app)}>Delete</button></div></div>) : <div className="empty-state">No applications match your filters.</div>}
      </section>
    </div>
  );
}
