import React from 'react';
import { Klant } from '../types/Klant';

interface StatusWijzigerProps {
  werkbon: Klant;
  onStatusWijziging: (nieuweStatus: Klant['status']) => void;
}

const StatusWijziger: React.FC<StatusWijzigerProps> = ({ werkbon, onStatusWijziging }) => {
  const statussen: Klant['status'][] = [
    'Gepland',
    'Voltooid',
    'Klant niet thuis',
    'Geannuleerd',
    'Niet voltooid',
    'In de wacht'
  ];

  return (
    <div className="flex items-center space-x-2">
      <span className="font-semibold">Status:</span>
      <select
        value={werkbon.status}
        onChange={(e) => onStatusWijziging(e.target.value as Klant['status'])}
        className="border rounded px-2 py-1"
      >
        {statussen.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusWijziger;