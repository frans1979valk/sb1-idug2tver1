import React, { useState } from 'react';
import { Klant } from '../types/Klant';

const KlantInvoer: React.FC = () => {
  const [klant, setKlant] = useState<Partial<Klant>>({
    status: 'In de wacht',
    invoerbron: 'Formulier'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setKlant(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementeer de logica om de klant op te slaan
    console.log('Klant gegevens:', klant);
    // Reset het formulier of navigeer naar een andere pagina
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Nieuwe Klant Invoeren</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="subject" className="block mb-1">Onderwerp</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={klant.subject || ''}
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
            value={klant.klantInfo || ''}
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
            value={klant.address || ''}
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
            value={klant.startDateTime || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="status" className="block mb-1">Status</label>
          <select
            id="status"
            name="status"
            value={klant.status}
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
          Klant Toevoegen
        </button>
      </form>
    </div>
  );
};

export default KlantInvoer;