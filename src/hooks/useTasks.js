import { useEffect, useState } from 'react'

const STORAGE_KEY = 'daylight.tasks'

const starterTasks = [
  {
    id: 'task-1',
    title: 'Review the Q4 project brief',
    category: 'Work',
    time: '09:30 AM',
    completed: false,
    priority: 'High',
  },
  {
    id: 'task-2',
    title: 'Send the design notes to Maya',
    category: 'Work',
    time: '11:00 AM',
    completed: false,
    priority: 'Normal',
  },
  {
    id: 'task-3',
    title: 'Take a proper lunch break',
    category: 'Personal',
    time: '12:30 PM',
    completed: true,
    priority: 'Normal',
  },
  {
    id: 'task-4',
    title: 'Pick up groceries on the way home',
    category: 'Personal',
    time: '05:30 PM',
    completed: false,
    priority: 'Normal',
  },
]

function readTasks() {
  const savedTasks = window.localStorage.getItem(STORAGE_KEY)
  return savedTasks ? JSON.parse(savedTasks) : starterTasks
}

export function useTasks() {
  const [tasks, setTasks] = useState(readTasks)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  function addTask(taskDetails) {
    setTasks((currentTasks) => [
      {
        ...taskDetails,
        id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        completed: false,
      },
      ...currentTasks,
    ])
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function removeTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    )
  }

  return { tasks, addTask, toggleTask, removeTask }
}
