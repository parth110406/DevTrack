import './RecentProjects.css';

export default function RecentProjects({ projects = [] }) {
  // Take up to 3 most recent projects (already sorted by caller)
  const recent = projects.slice(0, 3);

  return (
    <section className="recent-projects">
      <div className="section-header">
        <h2 className="section-title">Recent Projects</h2>
      </div>

      <div className="recent-projects__list">
        {recent.length > 0 ? (
          recent.map((project, index) => (
            <div
              key={project.id}
              className={`recent-projects__row ${
                index < recent.length - 1 ? 'recent-projects__row--bordered' : ''
              }`}
            >
              <div className="recent-projects__info">
                <span className="recent-projects__name">{project.name}</span>
                <span className="recent-projects__desc">{project.description}</span>
              </div>
              <div className="recent-projects__right">
                <div className="recent-projects__tags">
                  {(project.technologies || []).map((tag) => (
                    <span key={tag} className="recent-projects__tag">{tag}</span>
                  ))}
                </div>
                <span className="recent-projects__date">{project.updatedAt}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="recent-projects__row">
            <span className="recent-projects__desc">No projects yet.</span>
          </div>
        )}
      </div>
    </section>
  );
}
