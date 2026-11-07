/**
 * Project list persistence utility — localStorage layer.
 *
 * This is temporary persistence for the prototype phase.
 * It will be replaced by a backend API + MongoDB in a future iteration.
 *
 * Storage key: "devtrack_projects"
 * Stores the full project array as JSON.
 *
 * On first load, falls back to the default mock projects from projectData.js.
 */

import { projectData as defaultProjects } from '../data/projectData';
import { addActivity } from './activityStorage';

const STORAGE_KEY = 'devtrack_projects';

/**
 * Load all projects from localStorage.
 * Falls back to the default demo projects if nothing is stored.
 */
export function loadProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [...defaultProjects];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return [...defaultProjects];
  } catch {
    return [...defaultProjects];
  }
}

/**
 * Save the full project list to localStorage.
 * @param {Array} projects
 */
export function saveProjects(projects) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    // Notify other components (e.g. Dashboard) within the same tab
    window.dispatchEvent(new CustomEvent('devtrack-projects-updated'));
  } catch {
    console.warn('[DevTrack] Could not persist projects to localStorage.');
  }
}

/**
 * Generate a URL-safe slug ID from a project name + short timestamp suffix.
 * Example: "AI Resume Analyzer" → "ai-resume-analyzer-1694787600000"
 * @param {string} name
 * @returns {string}
 */
export function generateProjectId(name) {
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${slug}-${Date.now()}`;
}

/**
 * Create a new project object from form data and add it to the list.
 * @param {Array} currentProjects
 * @param {object} formData - { name, description, technologies, status, progress, github, liveDemo, notes }
 * @returns {{ projects: Array, newProject: object }}
 */
export function createProject(currentProjects, formData) {
  const newProject = {
    id: generateProjectId(formData.name),
    name: formData.name.trim(),
    description: formData.description.trim(),
    technologies: [...formData.technologies],
    status: formData.status,
    progress: formData.progress,
    updatedAt: 'Just now',
    github: formData.github?.trim() || null,
    liveDemo: formData.liveDemo?.trim() || null,
  };

  const projects = [newProject, ...currentProjects];
  saveProjects(projects);
  addActivity(`Created project \"${newProject.name}\"`, 'project');
  return { projects, newProject };
}

/**
 * Delete a project by ID from the collection and persist.
 * @param {Array} currentProjects
 * @param {string} projectId
 * @returns {Array} updated project list
 */
export function deleteProject(currentProjects, projectId) {
  const deleted = currentProjects.find((p) => p.id === projectId);
  const projects = currentProjects.filter((p) => p.id !== projectId);
  saveProjects(projects);
  if (deleted) addActivity(`Deleted project \"${deleted.name}\"`, 'project');
  return projects;
}

/**
 * Update an existing project by ID and persist.
 * @param {Array} currentProjects
 * @param {object} formData - { name, description, technologies, status, progress, github, liveDemo }
 * @returns {Array} updated project list
 */
export function updateProject(currentProjects, formData) {
  const projects = currentProjects.map((p) =>
    p.id === formData.id
      ? {
          ...p,
          name: formData.name?.trim() ?? p.name,
          description: formData.description?.trim() ?? p.description,
          technologies: [...(formData.technologies ?? p.technologies)],
          status: formData.status ?? p.status,
          progress: formData.progress ?? p.progress,
          github: formData.github?.trim() || p.github || null,
          liveDemo: formData.liveDemo?.trim() || p.liveDemo || null,
        }
      : p
  );
  saveProjects(projects);
  const updated = projects.find((p) => p.id === formData.id);
  addActivity(`Updated project \"${updated?.name || 'project'}\"`, 'project');
  return projects;
}
