import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { loadProjects, saveProjects, createProject, deleteProject, updateProject } from '../utils/projectStorage';
import { loadProjectNotes, saveProjectNotes } from '../utils/projectNotesStorage';
import ProjectRow from '../components/ProjectRow';
import ProjectDetailPanel from '../components/ProjectDetailPanel';
import NewProjectModal from '../components/NewProjectModal';
import './Projects.css';

export default function Projects() {
  /* ── Persisted project notes (localStorage — temporary, will move to backend) */
  const notesRef = useRef(loadProjectNotes());

  /* ── State ────────────────────────────────────────── */
  const [projects, setProjects] = useState(() => loadProjects());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedTech, setSelectedTech] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [projectNotes, setProjectNotes] = useState(() => notesRef.current);
  const [successMsg, setSuccessMsg] = useState('');

  /* ── Handle editing project modal ──────────────────── */
  const openEditModal = useCallback((project) => {
    setEditingProject(project);
    setSelectedProjectId(null); // Close detail panel
    setShowModal(true);
  }, []);

  const closeEditModal = useCallback(() => {
    setEditingProject(null);
    setShowModal(false);
  }, []);

  /* ── Auto-dismiss success message ────────────────── */
  useEffect(() => {
    if (!successMsg) return;
    const timer = setTimeout(() => setSuccessMsg(''), 3000);
    return () => clearTimeout(timer);
  }, [successMsg]);

  /* ── Derived: unique technologies ─────────────────── */
  const technologies = useMemo(
    () =>
      [...new Set(projects.flatMap((p) => p.technologies))].sort(),
    [projects]
  );

  /* ── Derived: filtered projects ───────────────────── */
  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return projects.filter((p) => {
      if (query && !p.name.toLowerCase().includes(query) && !p.description.toLowerCase().includes(query)) {
        return false;
      }
      if (selectedStatus && p.status !== selectedStatus) return false;
      if (selectedTech && !p.technologies.includes(selectedTech)) return false;
      return true;
    });
  }, [projects, searchQuery, selectedStatus, selectedTech]);

  /* ── Derived: selected project ───────────────────── */
  const selectedProject = useMemo(
    () => (selectedProjectId ? projects.find((p) => p.id === selectedProjectId) : null),
    [projects, selectedProjectId]
  );

  /* ── Modal open / close ──────────────────────────── */
  const handleOpenModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  /* ── Create project ──────────────────────────────── */
  const handleCreateProject = useCallback((formData) => {
    const { projects: updated, newProject } = createProject(projects, formData);
    setProjects(updated);

    // Persist initial notes if provided in the form
    if (formData.notes?.trim()) {
      const nextNotes = { ...notesRef.current, [newProject.id]: formData.notes.trim() };
      notesRef.current = nextNotes;
      setProjectNotes(nextNotes);
      saveProjectNotes(nextNotes);
    }

    setShowModal(false);
    setSuccessMsg(`"${newProject.name}" created successfully.`);
  }, [projects]);

  /* ── Update project ──────────────────────────────── */
  const handleUpdateProject = useCallback((formData) => {
    const updated = updateProject(projects, formData);
    setProjects(updated);
    setShowModal(false);
    setSuccessMsg(`"${formData.name}" updated successfully.`);
  }, [projects]);

  /* ── Select / close project ──────────────────────── */
  const handleSelectProject = useCallback((project) => {
    setSelectedProjectId(project.id);
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedProjectId(null);
  }, []);

  /* ── Edit project ─────────────────────────────────── */
  const handleEditProject = useCallback((project) => {
    openEditModal(project);
  }, [openEditModal]);

  /* ── Delete project ───────────────────────────────── */
  const handleDeleteProject = useCallback((projectId) => {
    const updated = deleteProject(projects, projectId);
    setProjects(updated);
    if (selectedProjectId === projectId) {
      setSelectedProjectId(null);
    }
    setSuccessMsg('Project deleted successfully.');
  }, [projects, selectedProjectId]);

  /* ── Notes update (persisted to localStorage) ────── */
  const handleNotesChange = useCallback((id, note) => {
    setProjectNotes((prev) => {
      const next = { ...prev, [id]: note };
      notesRef.current = next;
      saveProjectNotes(next);
      return next;
    });
  }, []);

  /* ── Render ──────────────────────────────────────── */
  return (
    <div className="projects-page">
      {/* Header */}
      <header className="projects-page__header">
        <div className="projects-page__header-left">
          <h1 className="projects-page__title">Projects</h1>
          <p className="projects-page__subtitle">
            Track what you&apos;re building and where you&apos;re going.
          </p>
        </div>
        <button
          className="projects-page__new-btn"
          onClick={handleOpenModal}
        >
          + New Project
        </button>
      </header>

      {/* Success message */}
      {successMsg && (
        <div className="projects-page__success">{successMsg}</div>
      )}

      {/* Filters */}
      <div className="projects-filters">
        <div className="projects-filters__search">
          <svg
            className="projects-filters__search-icon"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="6" cy="6" r="4.5" />
            <line x1="9.2" y1="9.2" x2="12.5" y2="12.5" />
          </svg>
          <input
            id="projects-search"
            type="text"
            className="projects-filters__input"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="projects-filters__selects">
          <select
            id="projects-filter-status"
            className="projects-filters__select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Planning">Planning</option>
            <option value="On Hold">On Hold</option>
          </select>

          <select
            id="projects-filter-tech"
            className="projects-filters__select"
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
          >
            <option value="">All Tech</option>
            {technologies.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Project list */}
      <div className="projects-list">
        {/* Column headers */}
        <div className="projects-list__header">
          <span className="projects-list__header-cell projects-list__header-cell--icon" />
          <span className="projects-list__header-cell projects-list__header-cell--name">Project</span>
          <span className="projects-list__header-cell projects-list__header-cell--tags">Technologies</span>
          <span className="projects-list__header-cell projects-list__header-cell--status">Status</span>
          <span className="projects-list__header-cell projects-list__header-cell--progress">Progress</span>
          <span className="projects-list__header-cell projects-list__header-cell--updated">Updated</span>
          <span className="projects-list__header-cell projects-list__header-cell--arrow" />
        </div>

        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectRow
              key={project.id}
              project={project}
              onSelect={handleSelectProject}
            />
          ))
        ) : (
          <div className="projects-list__empty">
            No projects match your filters.
          </div>
        )}
      </div>

      {/* Project Detail Panel */}
      <ProjectDetailPanel
        project={selectedProject}
        note={selectedProject ? (projectNotes[selectedProject.id] ?? '') : ''}
        onClose={handleClosePanel}
        onNotesChange={handleNotesChange}
        onDelete={handleDeleteProject}
        onEdit={handleEditProject}
      />

      {/* New / Edit Project Modal */}
      {showModal && (
        <NewProjectModal
          project={editingProject}
          onClose={closeEditModal}
          onCreate={handleCreateProject}
          onUpdate={handleUpdateProject}
        />
      )}
    </div>
  );
}
