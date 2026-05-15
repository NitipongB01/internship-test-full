import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { fakeLogin } from '../services/fakeApi'
import { AuthContext } from '../context/AuthContext'

const LoginPage = () => {
  const [username, setUsername] = useState('admin')
  const [loading, setLoading] = useState(false)

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      setLoading(true)

      const user = await fakeLogin(username)

      login(user)

      if (user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/employee')
      }
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-2xl shadow-xl w-[400px]'>
        <h1 className='text-3xl font-bold mb-6 text-center'>
          Task Tracker Login
        </h1>

        <select
          className='w-full border p-3 rounded-lg mb-4'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        >
          <option value='admin'>Admin</option>
          <option value='employee'>Employee</option>
        </select>

        <button
          onClick={handleLogin}
          className='w-full bg-black text-white p-3 rounded-lg hover:opacity-90 transition'
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </div>
    </div>
  )
}

export default LoginPage