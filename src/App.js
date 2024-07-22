import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';

import PrivateRoute from './routes/PrivateRoute';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Router>
      <div>
      <Routes>
        <Route path="/" element={<LoginForm />}/>
        <Route path="/user-details" element={<PrivateRoute />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
      </div>
    </Router>
  );
};

export default App;
