import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [wachtwoord, setWachtwoord] = useState('');
  const [foutmelding, setFoutmelding] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFoutmelding('');

    // Gebruikersgegevens
    const users = {
      'planner1@vipinstallatie.nl': { name: 'Planner 1', role: 'planner' },
      'planner2@vipinstallatie.nl': { name: 'Planner 2', role: 'planner' },
      'monteur1@vipinstallatie.nl': { name: 'Monteur 1', role: 'monteur' },
      'monteur2@vipinstallatie.nl': { name: 'Monteur 2', role: 'monteur' },
      'monteur3@vipinstallatie.nl': { name: 'Monteur 3', role: 'monteur' },
      'monteur4@vipinstallatie.nl': { name: 'Monteur 4', role: 'monteur' },
      'monteur5@vipinstallatie.nl': { name: 'Monteur 5', role: 'monteur' },
      'beheerder@vipinstallatie.nl': { name: 'Beheerder', role: 'admin' },
      'superadmin@vipinstallatie.nl': { name: 'Superadmin', role: 'superadmin' },
    };

    // Simuleer login logica
    if (email in users && wachtwoord === 'Welkom123!') {
      const { name, role } = users[email as keyof typeof users];
      setUser({
        id: email,
        name,
        email,
        role,
      });
      navigate('/');
    } else {
      setFoutmelding('Ongeldige e-mail of wachtwoord');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Inloggen</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">E-mailadres</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="wachtwoord" className="block mb-1">Wachtwoord</label>
          <input
            type="password"
            id="wachtwoord"
            value={wachtwoord}
            onChange={(e) => setWachtwoord(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {foutmelding && (
          <p className="text-red-500">{foutmelding}</p>
        )}
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
          Inloggen
        </button>
      </form>
    </div>
  );
};

export default Login;