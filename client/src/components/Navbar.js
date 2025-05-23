import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-neutral-light text-xl font-bold">wonder-wise</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-accent hover:text-secondary">Dashboard</Link>
              <Link to="/trips/new" className="text-accent hover:text-secondary">New Trip</Link>
              <button
                onClick={logout}
                className="text-neutral-light hover:text-secondary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="text-accent hover:text-secondary">Signup</Link>
              <Link to="/login" className="text-accent hover:text-secondary">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;