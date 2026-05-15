import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ user, allowedRole, children }) => {
  if (!user) {
    return <Navigate to='/' />
  }

  if (user.role !== allowedRole) {
    return <Navigate to='/unauthorized' />
  }

  return children
}

export default ProtectedRoute