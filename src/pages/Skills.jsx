import { useMemo, useState } from 'react';
import { loadSkills, saveSkills } from '../utils/skillsStorage';
import { addActivity } from '../utils/activityStorage';
import './Skills.css';

export default function Skills() {
  const [skills, setSkills] = useState(() => loadSkills());
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Frontend', level: 50 });

  const groups = useMemo(() => {
    return skills.reduce((acc, skill) => {
      (acc[skill.category] ||= []).push(skill);
      return acc;
    }, {});
  }, [skills]);

  const updateSkill = (id, level) => {
    const next = skills.map((s) => s.id === id ? { ...s, level: Number(level) } : s);
    setSkills(next); saveSkills(next);
  };
  const deleteSkill = (id) => {
    const next = skills.filter((s) => s.id !== id);

    setSkills(next);
    saveSkills(next);
  };

  const addSkill = (e) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;
    const skill = { id: `skill-${Date.now()}`, ...newSkill, name: newSkill.name.trim(), level: Number(newSkill.level) };
    const next = [...skills, skill];
    setSkills(next); saveSkills(next); addActivity(`Added skill "${skill.name}"`, 'skill');
    setNewSkill({ name: '', category: 'Frontend', level: 50 });
  };

  return (
    <div className="skills-page">
      <header className="simple-page-header"><div><h1>Skills</h1><p>Track the technologies you are learning and using.</p></div></header>
      <form className="skill-add-card" onSubmit={addSkill}>
        <input value={newSkill.name} onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })} placeholder="Add a skill, e.g. TypeScript" />
        <select value={newSkill.category} onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}>
          <option>Frontend</option><option>Backend</option><option>Database</option><option>AI / ML</option><option>Tools</option>
        </select>
        <input type="number" min="0" max="100" value={newSkill.level} onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })} />
        <button type="submit">+ Add Skill</button>
      </form>
      <div className="skills-grid">
        {Object.entries(groups).map(([category, items]) => (
          <section className="skill-group" key={category}>
            <div className="section-header"><h2 className="section-title">{category}</h2><span className="section-meta">{items.length} tracked</span></div>
            <div className="skill-list">
              {items.map((skill) => (
  <div className="skill-row" key={skill.id}>
    <div className="skill-row__top">
      <span>{skill.name}</span>

      <div className="skill-actions">
        <strong>{skill.level}%</strong>

        <button
          type="button"
          className="skill-delete"
          onClick={() => deleteSkill(skill.id)}
          aria-label={`Delete ${skill.name}`}
        >
          Delete
        </button>
      </div>
    </div>

    <div className="skill-bar">
      <div
        className="skill-bar__fill"
        style={{ width: `${skill.level}%` }}
      ></div>
    </div>

    <input
      aria-label={`${skill.name} proficiency`}
      type="range"
      min="0"
      max="100"
      value={skill.level}
      onChange={(e) => updateSkill(skill.id, e.target.value)}
    />
  </div>
))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
