import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import MonteurDashboard from '../components/MonteurDashboard';
import PlannerDashboard from '../components/PlannerDashboard';
import AdminDashboard from '../components/AdminDashboard';
import { getKlanten } from '../services/api';
import { Klant } from '../types/Klant';

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const [klanten, setKlanten] = useState<Klant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchKlanten = async () => {
      try {
        const data = await getKlanten();
        setKlanten(data);
      } catch (error) {
        console.error('Fout bij het ophalen van klanten:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKlanten();
  }, []);

  if (!user) {
    return <div>U moet ingelogd zijn om het dashboard te bekijken.</div>;
  }

  if (isLoading) {
    return <div>Laden...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {user.role === 'monteur' && <MonteurDashboard klanten={klanten} />}
      {user.role === 'planner' && <PlannerDashboard klanten={klanten} />}
      {(user.role === 'admin' || user.role === 'superadmin') && <AdminDashboard klanten={klanten} />}
    </div>
  );
};

export default Dashboard;