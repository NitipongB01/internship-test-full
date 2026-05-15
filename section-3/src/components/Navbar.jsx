import { useContext } from 'react'

import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogout = () => {
    logout()

    navigate('/')
  }

  return (
    <div className='bg-black text-white px-8 py-4 flex justify-between items-center'>
      <h1 className='text-xl font-bold'>
        Task Tracker
      </h1>

      <div className='flex items-center gap-4'>
        <p>
          {user?.username} ({user?.role})
        </p>

        <button
          onClick={handleLogout}
          className='bg-white text-black px-4 py-2 rounded-lg'
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar