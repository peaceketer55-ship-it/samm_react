import TaskList from './TaskList.jsx'
import OverviewPanel from './OverviewPanel.jsx'

const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

function formattedDate() {
  return new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date())
}

function Dashboard({
  activeView,
  tasks,
  allTasks,
  search,
  onSearchChange,
  onChangeView,
  onToggleTask,
  onRemoveTask,
  onAddTask,
}) {
  const completedCount = allTasks.filter((task) => task.completed).length
  const progress = allTasks.length
    ? Math.round((completedCount / allTasks.length) * 100)
    : 0

  return (
    <main className="dashboard">
      <header className="topbar">
        <div className="breadcrumbs">
          <span>My workspace</span>
          <span className="breadcrumb-divider">/</span>
          <strong>{activeView}</strong>
        </div>
        <div className="topbar-actions">
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Search tasks..."
              aria-label="Search tasks"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
            />
            <kbd>⌘ K</kbd>
          </label>
          <button className="icon-button notification-button" type="button" aria-label="Notifications">
            ♧<span className="notification-dot" />
          </button>
          <button className="topbar-avatar" type="button" aria-label="Open profile">S</button>
        </div>
      </header>

      <div className="dashboard-layout">
        <section className="main-column" aria-label="Task dashboard">
          <div className="welcome-row">
            <div>
              <p className="eyebrow">{formattedDate()}</p>
              <h1>{activeView === 'Today' ? 'Make today count.' : activeView}</h1>
              <p className="welcome-subtitle">
                {activeView === 'Today'
                  ? 'A little progress each day adds up to a lot.'
                  : `Take a look at your ${activeView.toLowerCase()} tasks.`}
              </p>
            </div>
            <button className="primary-button desktop-add-task" type="button" onClick={onAddTask}>
              <span aria-hidden="true">＋</span> Add a task
            </button>
          </div>

          <section className="focus-card" aria-label="Daily focus">
            <div className="focus-copy">
              <span className="focus-icon" aria-hidden="true">✳</span>
              <div>
                <span className="focus-label">YOUR DAILY FOCUS</span>
                <h2>Progress, not perfection.</h2>
                <p>You’ve completed {completedCount} of {allTasks.length} tasks. Keep your momentum going.</p>
              </div>
            </div>
            <div className="progress-ring" style={{ '--progress': `${progress}%` }} aria-label={`${progress}% complete`}>
              <span>{progress}%</span>
            </div>
            <div className="focus-decoration" aria-hidden="true">✦</div>
          </section>

          <div className="task-section-heading">
            <div>
              <h2>{activeView === 'Today' ? 'Your tasks' : `${activeView} tasks`}</h2>
              <p>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} to keep things moving</p>
            </div>
            <div className="day-picker" aria-label="Days of the week">
              {weekdays.map((day, index) => (
                <button
                  type="button"
                  className={`day-pill${index === (new Date().getDay() + 6) % 7 ? ' is-today' : ''}`}
                  key={`${day}-${index}`}
                  aria-label={`${['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][index]}${index === (new Date().getDay() + 6) % 7 ? ', today' : ''}`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <TaskList
            tasks={tasks}
            onToggleTask={onToggleTask}
            onRemoveTask={onRemoveTask}
            onAddTask={onAddTask}
          />
        </section>
        <OverviewPanel tasks={allTasks} onChangeView={onChangeView} />
      </div>
    </main>
  )
}

export default Dashboard
