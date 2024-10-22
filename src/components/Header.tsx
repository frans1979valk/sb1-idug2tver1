import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { LogOut, Settings } from 'lucide-react';

const Header: React.FC = () => {
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Werkbon Systeem</Link>
        <nav>
          {user ? (
            <div className="flex items-center space-x-4">
              <span>Welkom, {user.name}</span>
              <Link to="/instellingen" className="text-white hover:text-blue-200">
                <Settings size={18} />
              </Link>
              <button
                onClick={handleLogout}
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                <LogOut className="mr-2" size={18} />
                Uitloggen
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
              Inloggen
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;