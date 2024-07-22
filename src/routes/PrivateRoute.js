import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
import  UserDetails  from '../components/UserDetails';

const PrivateRoute = () => {
    const user = getCurrentUser();
  
    if (!user) {
      // If user is not authenticated, redirect to '/'
      return <Navigate to="/" />;
    }
  
    return UserDetails();
  };

export default PrivateRoute;
