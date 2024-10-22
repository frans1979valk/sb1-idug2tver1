import React, { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay, parseISO } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Klant } from '../types/Klant';

interface AgendaProps {
  afspraken: Klant[];
  monteurs: string[];
}

const Agenda: React.FC<AgendaProps> = ({ afspraken, monteurs }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedMonteur, setSelectedMonteur] = useState<string | null>(null);

  const weekDays = [...Array(7)].map((_, i) => addDays(startOfWeek(currentWeek), i));

  const getAfsprakenVoorDag = (dag: Date) => {
    return afspraken.filter(afspraak => 
      isSameDay(parseISO(afspraak.startDateTime), dag) &&
      (!selectedMonteur || afspraak.monteur === selectedMonteur)
    );
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeek(prevWeek => addDays(prevWeek, direction === 'next' ? 7 : -7));
  };

  const monteurKleuren: { [key: string]: string } = {
    'monteur1@vipinstallatie.nl': 'bg-red-100',
    'monteur2@vipinstallatie.nl': 'bg-blue-100',
    'monteur3@vipinstallatie.nl': 'bg-green-100',
    'monteur4@vipinstallatie.nl': 'bg-yellow-100',
    'monteur5@vipinstallatie.nl': 'bg-purple-100',
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Agenda</h3>
        <div className="flex items-center space-x-4">
          <select
            value={selectedMonteur || ''}
            onChange={(e) => setSelectedMonteur(e.target.value || null)}
            className="border rounded px-2 py-1"
          >
            <option value="">Alle monteurs</option>
            {monteurs.map(monteur => (
              <option key={monteur} value={monteur}>{monteur}</option>
            ))}
          </select>
          <button onClick={() => navigateWeek('prev')} className="px-3 py-1 bg-gray-200 rounded">Vorige</button>
          <button onClick={() => navigateWeek('next')} className="px-3 py-1 bg-gray-200 rounded">Volgende</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, index) => (
          <div key={index} className="border p-2">
            <div className="font-bold mb-2">{format(day, 'EEEE d MMMM', { locale: nl })}</div>
            {getAfsprakenVoorDag(day).map(afspraak => (
              <div key={afspraak.id} className={`${monteurKleuren[afspraak.monteur] || 'bg-gray-100'} p-2 mb-2 rounded`}>
                <div className="font-semibold">{format(parseISO(afspraak.startDateTime), 'HH:mm')}</div>
                <div>{afspraak.subject}</div>
                <div className="text-sm text-gray-600">{afspraak.locationDisplayName}</div>
                <div className="text-xs text-gray-500">{afspraak.monteur}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agenda;