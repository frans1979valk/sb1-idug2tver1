import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';

interface Monteur {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

const MonteursKaart: React.FC = () => {
  const { user } = useUser();
  const [monteurData, setMonteurData] = useState<Monteur>({
    id: user?.id || '',
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMonteurData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementeer de logica om de monteurgegevens op te slaan
    console.log('Monteur gegevens opgeslagen:', monteurData);
    // Hier zou je een API-call maken om de gegevens op te slaan
  };

  const handlePasswordReset = () => {
    // TODO: Implementeer de logica voor wachtwoordreset
    console.log('Wachtwoordreset aangevraagd voor:', monteurData.email);
    // Hier zou je een API-call maken om een wachtwoordreset te initiëren
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-6">Monteurskaart</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Naam
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={monteurData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            E-mailadres
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            value={monteurData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
            Telefoonnummer
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            value={monteurData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Gegevens Opslaan
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handlePasswordReset}
          >
            Wachtwoord Resetten
          </button>
        </div>
      </form>
    </div>
  );
};

export default MonteursKaart;