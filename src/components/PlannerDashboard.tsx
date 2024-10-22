import React from 'react';
import { useUser } from '../contexts/UserContext';
import Agenda from './Agenda';
import WerkbonOverzicht from './WerkbonOverzicht';
import StatusOverzicht from './StatusOverzicht';
import { Klant } from '../types/Klant';
import { Link } from 'react-router-dom';

interface PlannerDashboardProps {
  klanten: Klant[];
}

const PlannerDashboard: React.FC<PlannerDashboardProps> = ({ klanten }) => {
  const { user } = useUser();
  const monteurs = [...new Set(klanten.map(klant => klant.monteur))];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Welkom, {user?.name}</h2>
      
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Agenda</h3>
          <Link to="/werkbon-aanmaken" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Nieuwe Werkbon
          </Link>
        </div>
        <Agenda afspraken={klanten} monteurs={monteurs} />
      </section>
      
      <section>
        <h3 className="text-xl font-semibold mb-2">Alle Werkbonnen</h3>
        <WerkbonOverzicht werkbonnen={klanten} />
      </section>
      
      <section>
        <h3 className="text-xl font-semibold mb-2">Statusoverzicht</h3>
        <StatusOverzicht werkbonnen={klanten} />
      </section>
    </div>
  );
};

export default PlannerDashboard;