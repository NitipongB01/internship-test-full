import { Routes, Route } from 'react-router-dom'
import { useContext } from 'react'

import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import EmployeePage from './pages/EmployeePage'
import UnauthorizedPage from './pages/UnauthorizedPage'

import ProtectedRoute from './routes/ProtectedRoute'
import { AuthContext } from './context/AuthContext'

function App() {
  const { user } = useContext(AuthContext)

  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />

      <Route
        path='/admin'
        element={
          <ProtectedRoute user={user} allowedRole='admin'>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/employee'
        element={
          <ProtectedRoute user={user} allowedRole='employee'>
            <EmployeePage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/unauthorized'
        element={<UnauthorizedPage />}
      />

      <Route
        path='*'
        element={<UnauthorizedPage />}
      />
    </Routes>
  )
}

export default App