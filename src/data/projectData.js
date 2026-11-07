/**
 * Mock project data for the Projects page.
 * All values are demo/placeholder data.
 * Will be replaced by backend API + MongoDB later.
 */

export const projectData = [
  {
    id: 'devtrack',
    name: 'DevTrack',
    description: 'AI-powered developer productivity and career workspace.',
    technologies: ['React', 'Node.js', 'MongoDB', 'AI'],
    status: 'In Progress',
    progress: 78,
    updatedAt: '2 hours ago',
    github: null,   // TODO: add real GitHub URL when repo is public
    liveDemo: null,  // TODO: add real deployed URL when available
  },
  {
    id: 'devtrack-api',
    name: 'DevTrack API',
    description: 'Backend API powering the DevTrack application.',
    technologies: ['Node.js', 'Express', 'MongoDB'],
    status: 'In Progress',
    progress: 45,
    updatedAt: '1 day ago',
    github: null,
    liveDemo: null,
  },
  {
    id: 'markdown-editor',
    name: 'Markdown Editor',
    description: 'Minimal markdown editor with live preview.',
    technologies: ['React', 'TypeScript', 'CSS'],
    status: 'Completed',
    progress: 100,
    updatedAt: '1 week ago',
    github: null,
    liveDemo: null,
  },
  {
    id: 'portfolio-website',
    name: 'Portfolio Website',
    description: 'Personal developer portfolio and project showcase.',
    technologies: ['React', 'CSS', 'Vite'],
    status: 'Planning',
    progress: 15,
    updatedAt: '3 days ago',
    github: null,
    liveDemo: null,
  },
];
