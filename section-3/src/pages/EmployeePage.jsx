import { useContext, useState } from 'react'

import Navbar from '../components/Navbar'

import { AuthContext } from '../context/AuthContext'

import { tasks as initialTasks } from '../data/mockData'

const EmployeePage = () => {
  const { user } = useContext(AuthContext)

  const [tasks, setTasks] = useState(initialTasks)

  const assignedTasks = tasks.filter(
    (task) => task.assignedTo === user.id
  )

  const updateStatus = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          status: 'Done'
        }
      }

      return task
    })

    setTasks(updatedTasks)
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />

      <div className='p-10'>
        <div className='max-w-4xl mx-auto'>
          <h1 className='text-4xl font-bold mb-8'>
            Employee Dashboard
          </h1>

          <div className='grid gap-4'>
            {assignedTasks.map((task) => (
              <div
                key={task.id}
                className='bg-white p-5 rounded-2xl shadow'
              >
                <h2 className='text-xl font-semibold'>
                  {task.title}
                </h2>

                <p className='mt-2 mb-4'>
                  Status: {task.status}
                </p>

                {task.status !== 'Done' && (
                  <button
                    onClick={() => updateStatus(task.id)}
                    className='bg-black text-white px-4 py-2 rounded-lg'
                  >
                    Change Status
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeePage