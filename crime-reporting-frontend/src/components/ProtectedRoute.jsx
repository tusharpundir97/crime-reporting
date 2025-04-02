import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({children, allowedRoles}) => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      if (!token || !allowedRoles.includes(role)) {
            return <Navigate to="/login"/>
      }
  return children;
}

export default ProtectedRoute;