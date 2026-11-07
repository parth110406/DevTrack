/**
 * Mock data for the DevTrack dashboard.
 * All values are demo/placeholder data — clearly not real achievements.
 * Structured so each section can be swapped with API calls later.
 */

export const metrics = [
  {
    id: 'problems-solved',
    label: 'Problems Solved',
    value: 142,
    subtext: '+12 this week',
    trend: 'up',
  },
  {
    id: 'total-projects',
    label: 'Total Projects',
    value: 0,
    subtext: '',
    trend: 'neutral',
  },
  {
    id: 'skills-tracked',
    label: 'Skills Tracked',
    value: 8,
    subtext: '2 in progress',
    trend: 'neutral',
  },
  {
    id: 'applications-sent',
    label: 'Applications Sent',
    value: 12,
    subtext: '3 responses',
    trend: 'up',
  },
];

export const dsaProgress = {
  total: 142,
  categories: [
    { name: 'Arrays', solved: 32, total: 50 },
    { name: 'Strings', solved: 24, total: 35 },
    { name: 'Trees', solved: 22, total: 40 },
    { name: 'Graphs', solved: 18, total: 35 },
    { name: 'Dynamic Prog.', solved: 20, total: 45 },
    { name: 'Linked Lists', solved: 14, total: 20 },
    { name: 'Other', solved: 12, total: 25 },
  ],
};

export const recentActivity = [
  {
    id: 1,
    action: 'Solved "Two Sum" on LeetCode',
    category: 'dsa',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    action: 'Pushed 3 commits to devtrack',
    category: 'project',
    timestamp: '4 hours ago',
  },
  {
    id: 3,
    action: 'Applied to Frontend Engineer at Stripe',
    category: 'application',
    timestamp: 'Yesterday',
  },
  {
    id: 4,
    action: 'Completed "Binary Tree Inorder Traversal"',
    category: 'dsa',
    timestamp: 'Yesterday',
  },
  {
    id: 5,
    action: 'Added authentication to Markdown Editor',
    category: 'project',
    timestamp: '2 days ago',
  },
  {
    id: 6,
    action: 'Applied to Software Engineer at Vercel',
    category: 'application',
    timestamp: '3 days ago',
  },
];

export const navigation = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
  { id: 'dsa', label: 'DSA', icon: 'code' },
  { id: 'projects', label: 'Projects', icon: 'folder' },
  { id: 'skills', label: 'Skills', icon: 'zap' },
  { id: 'applications', label: 'Applications', icon: 'send' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];
