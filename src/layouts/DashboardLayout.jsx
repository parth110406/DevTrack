import Sidebar from '../components/Sidebar';
import TechBackground from '../components/TechBackground';
import './DashboardLayout.css';

export default function DashboardLayout({ children, activeNav, onNavChange }) {
  return (
    <div className="dashboard">
      <TechBackground />
      <Sidebar activeNav={activeNav} onNavChange={onNavChange} />
      <main className="dashboard__main">
        <div className="dashboard__content">
          {children}
        </div>
      </main>
    </div>
  );
}

