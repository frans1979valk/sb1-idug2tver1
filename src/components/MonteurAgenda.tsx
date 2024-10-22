import React, { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay, parseISO } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Klant } from '../types/Klant';

interface MonteurAgendaProps {
  afspraken: Klant[];
}

const MonteurAgenda: React.FC<MonteurAgendaProps> = ({ afspraken }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const weekDays = [...Array(7)].map((_, i) => addDays(startOfWeek(currentWeek), i));

  const getAfsprakenVoorDag = (dag: Date) => {
    return afspraken.filter(afspraak => isSameDay(parseISO(afspraak.startDateTime), dag));
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeek(prevWeek => addDays(prevWeek, direction === 'next' ? 7 : -7));
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Weekagenda</h3>
        <div>
          <button onClick={() => navigateWeek('prev')} className="mr-2 px-3 py-1 bg-gray-200 rounded">Vorige</button>
          <button onClick={() => navigateWeek('next')} className="px-3 py-1 bg-gray-200 rounded">Volgende</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day, index) => (
          <div key={index} className="border p-2">
            <div className="font-bold mb-2">{format(day, 'EEEE d MMMM', { locale: nl })}</div>
            {getAfsprakenVoorDag(day).map(afspraak => (
              <div key={afspraak.id} className="bg-blue-100 p-2 mb-2 rounded">
                <div className="font-semibold">{format(parseISO(afspraak.startDateTime), 'HH:mm')}</div>
                <div>{afspraak.subject}</div>
                <div className="text-sm text-gray-600">{afspraak.locationDisplayName}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonteurAgenda;