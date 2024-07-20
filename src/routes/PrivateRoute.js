import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

const PrivateRoute = ({ element, ...rest }) => {
    const user = getCurrentUser();
  
    if (!user) {
      // If user is not authenticated, redirect to '/'
      return <Navigate to="/" />;
    }
  
    return element;
  };

export default PrivateRoute;
