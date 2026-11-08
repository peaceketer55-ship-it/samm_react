import { useState } from 'react'

function TaskForm({ onSubmit, onClose }) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Work')
  const [time, setTime] = useState('')
  const [priority, setPriority] = useState('Normal')

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    onSubmit({ title: trimmedTitle, category, time, priority })
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="task-dialog" role="dialog" aria-modal="true" aria-labelledby="task-dialog-title">
        <div className="dialog-heading">
          <div>
            <p className="eyebrow">MAKE IT HAPPEN</p>
            <h2 id="task-dialog-title">Add a task</h2>
          </div>
          <button className="dialog-close" type="button" aria-label="Close dialog" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="form-field">
            <span>What needs to get done?</span>
            <input
              autoFocus
              required
              maxLength={100}
              placeholder="e.g. Plan the team offsite"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <div className="form-row">
            <label className="form-field">
              <span>Project</span>
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option>Work</option>
                <option>Personal</option>
              </select>
            </label>
            <label className="form-field">
              <span>Time</span>
              <input type="time" value={time} onChange={(event) => setTime(event.target.value)} />
            </label>
          </div>
          <label className="form-field">
            <span>Priority</span>
            <select value={priority} onChange={(event) => setPriority(event.target.value)}>
              <option>Normal</option>
              <option>High</option>
            </select>
          </label>
          <div className="dialog-actions">
            <button className="secondary-button" type="button" onClick={onClose}>Cancel</button>
            <button className="primary-button" type="submit">Add task <span aria-hidden="true">↗</span></button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default TaskForm
