import { useState } from 'react'

import Navbar from '../components/Navbar'

import { tasks as initialTasks } from '../data/mockData'

const AdminPage = () => {
  const [tasks, setTasks] = useState(initialTasks)
  const [title, setTitle] = useState('')

  const createTask = () => {
    if (!title.trim()) return

    const newTask = {
      id: Date.now(),
      title,
      status: 'To Do',
      assignedTo: 2
    }

    setTasks([...tasks, newTask])

    setTitle('')
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />

      <div className='p-10'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-4xl font-bold mb-8'>
            Admin Dashboard
          </h1>

          <div className='bg-white p-6 rounded-2xl shadow mb-6'>
            <div className='flex gap-4'>
              <input
                type='text'
                placeholder='Task title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='flex-1 border p-3 rounded-lg'
              />

              <button
                onClick={createTask}
                className='bg-black text-white px-6 rounded-lg'
              >
                Create Task
              </button>
            </div>
          </div>

          <div className='grid gap-4'>
            {tasks.map((task) => (
              <div
                key={task.id}
                className='bg-white p-5 rounded-2xl shadow'
              >
                <h2 className='text-xl font-semibold'>
                  {task.title}
                </h2>

                <p className='mt-2'>
                  Status: {task.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage