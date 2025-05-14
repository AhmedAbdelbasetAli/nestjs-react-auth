import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';


export default function AppPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="app-page">
      <h1>🔒 Welcome to the Application</h1>
      {user ? (
        <>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </>
      ) : (
        <p>No user found. Please <a href="/signin">sign in</a>.</p>
      )}
    </div>
  );
}