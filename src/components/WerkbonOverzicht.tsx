import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Klant } from '../types/Klant';

interface WerkbonOverzichtProps {
  werkbonnen: Klant[];
}

const WerkbonOverzicht: React.FC<WerkbonOverzichtProps> = ({ werkbonnen }) => {
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState<keyof Klant>('startDateTime');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredWerkbonnen = werkbonnen.filter(werkbon =>
    werkbon.klantInfo.toLowerCase().includes(filter.toLowerCase()) ||
    werkbon.ticketId.toLowerCase().includes(filter.toLowerCase()) ||
    werkbon.status.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedWerkbonnen = [...filteredWerkbonnen].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: keyof Klant) => {
    if (key === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Zoeken..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border rounded"
        />
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('ticketId')}>
              Ticket ID {sortBy === 'ticketId' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('klantInfo')}>
              Klant {sortBy === 'klantInfo' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('startDateTime')}>
              Datum {sortBy === 'startDateTime' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('status')}>
              Status {sortBy === 'status' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th className="py-3 px-6 text-left cursor-pointer" onClick={() => handleSort('monteur')}>
              Monteur {sortBy === 'monteur' && (sortOrder === 'asc' ? '▲' : '▼')}
            </th>
            <th className="py-3 px-6 text-center">Acties</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {sortedWerkbonnen.map((werkbon) => (
            <tr key={werkbon.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <span className="font-medium">{werkbon.ticketId}</span>
              </td>
              <td className="py-3 px-6 text-left">
                {werkbon.klantInfo}
              </td>
              <td className="py-3 px-6 text-left">
                {new Date(werkbon.startDateTime).toLocaleString()}
              </td>
              <td className="py-3 px-6 text-left">
                <span className={`bg-${werkbon.status === 'Voltooid' ? 'green' : 'yellow'}-200 text-${werkbon.status === 'Voltooid' ? 'green' : 'yellow'}-600 py-1 px-3 rounded-full text-xs`}>
                  {werkbon.status}
                </span>
              </td>
              <td className="py-3 px-6 text-left">
                {werkbon.monteur}
              </td>
              <td className="py-3 px-6 text-center">
                <Link to={`/klant/${werkbon.id}`} className="text-blue-600 hover:text-blue-900">Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WerkbonOverzicht;