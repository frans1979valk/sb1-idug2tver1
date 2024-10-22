import React from 'react';
import { Link } from 'react-router-dom';
import { Klant } from '../types/Klant';

interface OpdrachtOverzichtProps {
  type: 'gepland' | 'voltooid';
  limit: number;
  opdrachten: Klant[];
}

const OpdrachtOverzicht: React.FC<OpdrachtOverzichtProps> = ({ type, limit, opdrachten }) => {
  const filteredOpdrachten = opdrachten
    .filter(opdracht => type === 'gepland' ? opdracht.status === 'Gepland' : opdracht.status === 'Voltooid')
    .slice(0, limit);

  return (
    <div className="bg-white p-4 rounded shadow">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Klant</th>
            <th className="text-left py-2">Datum</th>
            <th className="text-left py-2">Status</th>
            <th className="text-left py-2">Actie</th>
          </tr>
        </thead>
        <tbody>
          {filteredOpdrachten.map(opdracht => (
            <tr key={opdracht.id} className="border-b">
              <td className="py-2">{opdracht.klantInfo}</td>
              <td className="py-2">{new Date(opdracht.startDateTime).toLocaleDateString()}</td>
              <td className="py-2">{opdracht.status}</td>
              <td className="py-2">
                <Link to={`/klant/${opdracht.id}`} className="text-blue-500 hover:underline">Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredOpdrachten.length === 0 && (
        <p className="text-gray-500 text-center py-4">Geen {type === 'gepland' ? 'geplande' : 'voltooide'} opdrachten gevonden.</p>
      )}
    </div>
  );
};

export default OpdrachtOverzicht;