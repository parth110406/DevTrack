import './PageHeader.css';

export default function PageHeader() {
  const today = new Date();
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  const dateStr = today.toLocaleDateString('en-US', options);

  return (
    <header className="page-header">
      <div className="page-header__left">
        <h1 className="page-header__title">Overview</h1>
        <p className="page-header__subtitle">
          {dateStr} — here's your progress snapshot.
        </p>
      </div>
    </header>
  );
}
