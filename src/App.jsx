import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './components/Dashboard.jsx'
import TaskForm from './components/TaskForm.jsx'
import { useTasks } from './hooks/useTasks.js'
import './App.css'

function App() {
  const { tasks, addTask, toggleTask, removeTask } = useTasks()
  const [activeView, setActiveView] = useState('Today')
  const [search, setSearch] = useState('')
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)

  const visibleTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase())

    if (activeView === 'Completed') return matchesSearch && task.completed
    if (activeView === 'Upcoming') return matchesSearch && !task.completed
    return matchesSearch
  })

  function handleAddTask(taskDetails) {
    addTask(taskDetails)
    setActiveView('Today')
    setIsTaskFormOpen(false)
  }

  return (
    <div className="app-shell">
      <Sidebar
        activeView={activeView}
        onChangeView={setActiveView}
        tasks={tasks}
        onAddTask={() => setIsTaskFormOpen(true)}
      />
      <Dashboard
        activeView={activeView}
        tasks={visibleTasks}
        allTasks={tasks}
        search={search}
        onSearchChange={setSearch}
        onChangeView={setActiveView}
        onToggleTask={toggleTask}
        onRemoveTask={removeTask}
        onAddTask={() => setIsTaskFormOpen(true)}
      />
      {isTaskFormOpen && (
        <TaskForm
          onSubmit={handleAddTask}
          onClose={() => setIsTaskFormOpen(false)}
        />
      )}
    </div>
  )
}

export default App
