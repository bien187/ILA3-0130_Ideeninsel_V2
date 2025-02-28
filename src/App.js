import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import PinwandPage from './components/PinWandPage';
import useAuth from './hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';

const App = () => {
  const user = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Router>
      <div className="nav-container" style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
        {user ? (
          <button 
            onClick={handleLogout}
            className="nav-button logout"
          >
            Logout
          </button>
        ) : (
          <Link 
            to="/login"
            className="nav-button login"
          >
            Login
          </Link>
        )}
      </div>
     
      <div className="app-container">
        <Routes>
          <Route path="/" element={<PinwandPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
