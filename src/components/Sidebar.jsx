import heroImage from '../assets/hero.png'

const navigationItems = [
  { label: 'Today', icon: '◷' },
  { label: 'Upcoming', icon: '▦' },
  { label: 'Completed', icon: '✓' },
]

function Sidebar({ activeView, onChangeView, tasks, onAddTask }) {
  const openCount = tasks.filter((task) => !task.completed).length

  return (
    <aside className="sidebar">
      <a className="brand" href="#today" aria-label="Daylight home">
        <span className="brand-mark" aria-hidden="true">
          <img src={heroImage} alt="" />
        </span>
        <span>daylight</span>
      </a>

      <div className="sidebar-section-label">Workspace</div>
      <nav className="side-nav" aria-label="Task views">
        {navigationItems.map(({ label, icon }) => (
          <button
            className={`nav-item${activeView === label ? ' is-active' : ''}`}
            key={label}
            type="button"
            aria-current={activeView === label ? 'page' : undefined}
            onClick={() => onChangeView(label)}
          >
            <span className="nav-icon" aria-hidden="true">
              {icon}
            </span>
            <span>{label}</span>
            {label === 'Today' && <span className="nav-count">{openCount}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-section-label projects-label">Your projects</div>
      <div className="project-list">
        <button className="project-item" type="button" onClick={() => onChangeView('Today')}>
          <span className="project-dot dot-lilac" />
          Work
        </button>
        <button className="project-item" type="button" onClick={() => onChangeView('Today')}>
          <span className="project-dot dot-peach" />
          Personal
        </button>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-quote">
          <span className="quote-sparkle" aria-hidden="true">✳</span>
          <p>Small steps every day add up to big change.</p>
        </div>
        <button className="profile-button" type="button" aria-label="Your profile">
          <span className="avatar">S</span>
          <span className="profile-copy">
            <strong>Sam Morgan</strong>
            <small>Free plan</small>
          </span>
          <span className="profile-menu" aria-hidden="true">···</span>
        </button>
      </div>
      <button className="mobile-add-task" type="button" onClick={onAddTask}>
        <span aria-hidden="true">＋</span> New task
      </button>
    </aside>
  )
}

export default Sidebar
