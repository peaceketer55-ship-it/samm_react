function TaskList({ tasks, onToggleTask, onRemoveTask, onAddTask }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state-icon" aria-hidden="true">✳</span>
        <h3>Nothing on your list</h3>
        <p>Enjoy the breathing room or add a new task when you’re ready.</p>
        <button className="text-button" type="button" onClick={onAddTask}>Create a task</button>
      </div>
    )
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li className={`task-row${task.completed ? ' is-complete' : ''}`} key={task.id}>
          <button
            className="task-checkbox"
            type="button"
            aria-label={`${task.completed ? 'Mark' : 'Complete'} ${task.title}`}
            aria-pressed={task.completed}
            onClick={() => onToggleTask(task.id)}
          >
            {task.completed && <span aria-hidden="true">✓</span>}
          </button>
          <div className="task-main">
            <span className="task-title">{task.title}</span>
            <div className="task-meta">
              <span className={`category-tag category-${task.category.toLowerCase()}`}>
                <span className="category-dot" />{task.category}
              </span>
              {task.time && <span className="task-time"><span aria-hidden="true">◷</span> {task.time}</span>}
            </div>
          </div>
          {task.priority === 'High' && <span className="priority-label">High priority</span>}
          <button
            className="remove-task-button"
            type="button"
            aria-label={`Delete ${task.title}`}
            onClick={() => onRemoveTask(task.id)}
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TaskList
