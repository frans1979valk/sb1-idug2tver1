import React from 'react';
import { useUser } from '../contexts/UserContext';
import MonteurAgenda from './MonteurAgenda';
import OpdrachtOverzicht from './OpdrachtOverzicht';
import { Klant } from '../types/Klant';

interface MonteurDashboardProps {
  klanten: Klant[];
}

const MonteurDashboard: React.FC<MonteurDashboardProps> = ({ klanten }) => {
  const { user } = useUser();

  const monteurKlanten = klanten.filter(klant => klant.monteur === user?.email);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Welkom, {user?.name}</h2>
      
      <section>
        <h3 className="text-xl font-semibold mb-2">Mijn Agenda</h3>
        <MonteurAgenda afspraken={monteurKlanten} />
      </section>
      
      <section>
        <h3 className="text-xl font-semibold mb-2">Geplande Opdrachten</h3>
        <OpdrachtOverzicht type="gepland" limit={10} opdrachten={monteurKlanten} />
      </section>
      
      <section>
        <h3 className="text-xl font-semibold mb-2">Voltooide Opdrachten</h3>
        <OpdrachtOverzicht type="voltooid" limit={10} opdrachten={monteurKlanten} />
      </section>
    </div>
  );
};

export default MonteurDashboard;