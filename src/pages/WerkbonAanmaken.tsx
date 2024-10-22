import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Klant } from '../types/Klant';
import { createKlant } from '../services/api';

const WerkbonAanmaken: React.FC = () => {
  const navigate = useNavigate();
  const [werkbon, setWerkbon] = useState<Partial<Klant>>({
    status: 'Gepland',
    invoerbron: 'Formulier'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setWerkbon(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const nieuweWerkbon = await createKlant(werkbon as Omit<Klant, 'id'>);
      console.log('Nieuwe werkbon aangemaakt:', nieuweWerkbon);
      navigate('/');
    } catch (error) {
      console.error('Fout bij het aanmaken van de werkbon:', error);
      // Hier kun je een foutmelding tonen aan de gebruiker
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Nieuwe Werkbon Aanmaken</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="subject" className="block mb-1">Onderwerp</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={werkbon.subject || ''}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="klantInfo" className="block mb-1">Klant Informatie</label>
          <input
            type="text"
            id="klantInfo"
            name="klantInfo"
            value={werkbon.klantInfo || ''}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="address" className="block mb-1">Adres</label>
          <input
            type="text"
            id="address"
            name="address"
            value={werkbon.address || ''}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="startDateTime" className="block mb-1">Start Datum en Tijd</label>
          <input
            type="datetime-local"
            id="startDateTime"
            name="startDateTime"
            value={werkbon.startDateTime || ''}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="monteur" className="block mb-1">Monteur</label>
          <select
            id="monteur"
            name="monteur"
            value={werkbon.monteur || ''}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Selecteer een monteur</option>
            <option value="monteur1@vipinstallatie.nl">Monteur 1</option>
            <option value="monteur2@vipinstallatie.nl">Monteur 2</option>
            <option value="monteur3@vipinstallatie.nl">Monteur 3</option>
            <option value="monteur4@vipinstallatie.nl">Monteur 4</option>
            <option value="monteur5@vipinstallatie.nl">Monteur 5</option>
          </select>
        </div>
        <div>
          <label htmlFor="bodyPreview" className="block mb-1">Opdrachtomschrijving</label>
          <textarea
            id="bodyPreview"
            name="bodyPreview"
            value={werkbon.bodyPreview || ''}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>
        <div>
          <label htmlFor="status" className="block mb-1">Status</label>
          <select
            id="status"
            name="status"
            value={werkbon.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Gepland">Gepland</option>
            <option value="In de wacht">In de wacht</option>
            <option value="Voltooid">Voltooid</option>
            <option value="Klant niet thuis">Klant niet thuis</option>
            <option value="Geannuleerd">Geannuleerd</option>
            <option value="Niet voltooid">Niet voltooid</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
          Werkbon Aanmaken
        </button>
      </form>
    </div>
  );
};

export default WerkbonAanmaken;