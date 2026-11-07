import { useState, useEffect, useMemo } from 'react';
import PageHeader from '../components/PageHeader';
import MetricCard from '../components/MetricCard';
import DSAProgress from '../components/DSAProgress';
import RecentProjects from '../components/RecentProjects';
import RecentActivity from '../components/RecentActivity';
import { metrics as baseMetrics } from '../data/mockData';
import { loadProjects } from '../utils/projectStorage';
import { getDSAStats, DSA_UPDATED_EVENT } from '../utils/dsaStatusStorage';
import { loadSkills, SKILLS_UPDATED_EVENT } from '../utils/skillsStorage';
import { loadApplications, APPLICATIONS_UPDATED_EVENT } from '../utils/applicationStorage';
import './Overview.css';

export default function Overview() {
  /* ── Load projects from the shared canonical source ── */
  const [projects, setProjects] = useState(() => loadProjects());

  /* ── Load DSA stats from the shared canonical source ── */
  const [dsaStats, setDsaStats] = useState(() => getDSAStats());
  const [skills, setSkills] = useState(() => loadSkills());
  const [applications, setApplications] = useState(() => loadApplications());

  /* ── Re-read projects when they change (same tab or other tab) ── */
  useEffect(() => {
    const refresh = () => setProjects(loadProjects());

    // Custom event fired by saveProjects() within the same tab
    window.addEventListener('devtrack-projects-updated', refresh);
    // Native storage event fired when localStorage changes in another tab
    window.addEventListener('storage', refresh);

    return () => {
      window.removeEventListener('devtrack-projects-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  /* ── Re-read DSA stats when solved status changes ── */
  useEffect(() => {
    const refreshDSA = () => setDsaStats(getDSAStats());

    // Custom event fired by saveSolvedStatus() within the same tab
    window.addEventListener(DSA_UPDATED_EVENT, refreshDSA);
    // Native storage event fired when localStorage changes in another tab
    window.addEventListener('storage', refreshDSA);

    return () => {
      window.removeEventListener(DSA_UPDATED_EVENT, refreshDSA);
      window.removeEventListener('storage', refreshDSA);
    };
  }, []);

  /* ── Re-read skills and applications when they change ── */
  useEffect(() => {
    const refresh = () => { setSkills(loadSkills()); setApplications(loadApplications()); };
    window.addEventListener(SKILLS_UPDATED_EVENT, refresh);
    window.addEventListener(APPLICATIONS_UPDATED_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(SKILLS_UPDATED_EVENT, refresh);
      window.removeEventListener(APPLICATIONS_UPDATED_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  /* ── Dynamically computed project metrics ──────── */
  const totalCount = projects.length;

  const statusBreakdown = useMemo(() => {
    const counts = {};
    projects.forEach((p) => {
      counts[p.status] = (counts[p.status] || 0) + 1;
    });
    // Build a compact breakdown string: "3 in progress · 1 completed · 1 planning"
    const parts = [];
    if (counts['In Progress']) parts.push(`${counts['In Progress']} in progress`);
    if (counts['Completed']) parts.push(`${counts['Completed']} completed`);
    if (counts['Planning']) parts.push(`${counts['Planning']} planning`);
    if (counts['On Hold']) parts.push(`${counts['On Hold']} on hold`);
    return parts.join(' · ') || `${totalCount} total`;
  }, [projects, totalCount]);

  /* ── Override dynamic metrics (projects + DSA) ───────── */
  const metrics = useMemo(
    () =>
      baseMetrics.map((m) => {
        if (m.id === 'total-projects') {
          return { ...m, value: totalCount, subtext: statusBreakdown };
        }
        if (m.id === 'problems-solved') return { ...m, value: dsaStats.totalSolved };
        if (m.id === 'skills-tracked') return { ...m, value: skills.length, subtext: `${skills.filter((s) => s.level < 70).length} in progress` };
        if (m.id === 'applications-sent') return { ...m, value: applications.length, subtext: `${applications.filter((a) => ['Interview', 'Offer'].includes(a.status)).length} active responses`, trend: applications.length ? 'up' : 'neutral' };
        return m;
      }),
    [totalCount, statusBreakdown, dsaStats, skills, applications]
  );

  return (
    <div className="overview">
      <PageHeader />

      <div className="overview__metrics">
        {metrics.map((m) => (
          <MetricCard
            key={m.id}
            label={m.label}
            value={m.value}
            subtext={m.subtext}
            trend={m.trend}
          />
        ))}
      </div>

      <div className="overview__grid">
        <div className="overview__primary">
          <DSAProgress />
        </div>
        <div className="overview__secondary">
          <RecentActivity />
        </div>
      </div>

      <div className="overview__full">
        <RecentProjects projects={projects} />
      </div>
    </div>
  );
}

