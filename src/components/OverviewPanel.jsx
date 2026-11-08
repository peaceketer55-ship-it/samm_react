function OverviewPanel({ tasks, onChangeView }) {
  const completedTasks = tasks.filter((task) => task.completed)
  const openTasks = tasks.filter((task) => !task.completed)

  return (
    <aside className="overview-panel" aria-label="Your week at a glance">
      <div className="overview-title-row">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h2>This week</h2>
        </div>
        <button className="more-button" type="button" aria-label="More overview options">···</button>
      </div>

      <div className="week-card">
        <div className="week-summary">
          <span className="week-summary-icon" aria-hidden="true">↗</span>
          <span>{completedTasks.length ? 'You’re finding your rhythm' : 'A fresh week awaits'}</span>
        </div>
        <p className="week-number">{completedTasks.length}<span> / {tasks.length} completed</span></p>
        <div className="week-progress" role="progressbar" aria-label="Weekly task completion" aria-valuenow={tasks.length ? Math.round((completedTasks.length / tasks.length) * 100) : 0} aria-valuemin="0" aria-valuemax="100">
          <span style={{ width: tasks.length ? `${(completedTasks.length / tasks.length) * 100}%` : '0%' }} />
        </div>
        <div className="week-chart" aria-label="Weekly activity">
          {[32, 54, 42, 78, 60, 25, 16].map((height, index) => (
            <div className="chart-column" key={index}>
              <span className={index === 3 ? 'chart-bar is-highlighted' : 'chart-bar'} style={{ height: `${height}%` }} />
              <small>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="quick-stats">
        <button className="stat-card" type="button" onClick={() => onChangeView('Upcoming')}>
          <span className="stat-icon stat-open" aria-hidden="true">◷</span>
          <span className="stat-content"><strong>{openTasks.length}</strong><small>To do</small></span>
          <span className="stat-arrow" aria-hidden="true">↗</span>
        </button>
        <button className="stat-card" type="button" onClick={() => onChangeView('Completed')}>
          <span className="stat-icon stat-done" aria-hidden="true">✓</span>
          <span className="stat-content"><strong>{completedTasks.length}</strong><small>Completed</small></span>
          <span className="stat-arrow" aria-hidden="true">↗</span>
        </button>
      </div>

      <div className="gentle-reminder">
        <span className="reminder-sun" aria-hidden="true">☼</span>
        <p>Remember to make space for a pause. You’re doing great.</p>
      </div>
    </aside>
  )
}

export default OverviewPanel
