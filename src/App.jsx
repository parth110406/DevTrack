import { useEffect, useState } from 'react';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/Overview';
import DSA from './pages/DSA';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Applications from './pages/Applications';
import Settings from './pages/Settings';

export default function App() {
  const [activeNav, setActiveNav] = useState(() => sessionStorage.getItem('devtrack_active_nav') || 'dashboard');

  useEffect(() => { sessionStorage.setItem('devtrack_active_nav', activeNav); }, [activeNav]);
  useEffect(() => { document.documentElement.dataset.theme = localStorage.getItem('devtrack_theme') || 'dark'; }, []);

  const renderPage = () => {
    switch (activeNav) {
      case 'dsa': return <DSA />;
      case 'projects': return <Projects />;
      case 'skills': return <Skills />;
      case 'applications': return <Applications />;
      case 'settings': return <Settings />;
      default: return <Overview />;
    }
  };

return (
  <DashboardLayout
    activeNav={activeNav}
    onNavChange={setActiveNav}
  >
    <div key={activeNav} className="page-entrance">
      {renderPage()}
    </div>
  </DashboardLayout>
);}
