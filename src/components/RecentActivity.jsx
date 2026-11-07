import { useEffect, useState } from 'react';
import { loadActivities, ACTIVITY_UPDATED_EVENT } from '../utils/activityStorage';
import './RecentActivity.css';

export default function RecentActivity() {
  const [activities, setActivities] = useState(() => loadActivities());

  useEffect(() => {
    const refresh = () => setActivities(loadActivities());
    window.addEventListener(ACTIVITY_UPDATED_EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(ACTIVITY_UPDATED_EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  return (
    <section className="recent-activity">
      <div className="section-header"><h2 className="section-title">Recent Activity</h2></div>
      <div className="recent-activity__timeline">
        {activities.slice(0, 6).map((item, index) => (
          <div key={item.id} className="recent-activity__item">
            <div className="recent-activity__indicator">
              <span className="recent-activity__dot" />
              {index < Math.min(activities.length, 6) - 1 && <span className="recent-activity__line" />}
            </div>
            <div className="recent-activity__content">
              <span className="recent-activity__action">{item.action}</span>
              <span className="recent-activity__time">{item.timestamp}</span>
            </div>
          </div>
        ))}
        {activities.length === 0 && <div className="recent-activity__empty">No activity yet.</div>}
      </div>
    </section>
  );
}
