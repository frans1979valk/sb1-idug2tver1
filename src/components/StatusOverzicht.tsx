import React from 'react';
import { Klant } from '../types/Klant';

interface StatusOverzichtProps {
  werkbonnen: Klant[];
}

const StatusOverzicht: React.FC<StatusOverzichtProps> = ({ werkbonnen }) => {
  const statusTotalen = werkbonnen.reduce((acc, werkbon) => {
    acc[werkbon.status] = (acc[werkbon.status] || 0) + 1;
    return acc;
  }, {} as Record<Klant['status'], number>);

  const statussen: Klant['status'][] = [
    'Gepland',
    'Voltooid',
    'Klant niet thuis',
    'Geannuleerd',
    'Niet voltooid',
    'In de wacht'
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {statussen.map(status => (
        <div key={status} className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold mb-2">{status}</h4>
          <p className="text-2xl font-bold">{statusTotalen[status] || 0}</p>
        </div>
      ))}
    </div>
  );
};

export default StatusOverzicht;