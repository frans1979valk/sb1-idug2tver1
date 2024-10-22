import React from 'react';
import { useUser } from '../contexts/UserContext';
import MonteursKaart from '../components/MonteursKaart';
import AdminFieldManagement from '../components/AdminFieldManagement';

const Instellingen: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Instellingen</h1>
      {user?.role === 'monteur' && <MonteursKaart />}
      {(user?.role === 'admin' || user?.role === 'superadmin') && (
        <>
          <MonteursKaart />
          <div className="mt-8">
            <AdminFieldManagement />
          </div>
        </>
      )}
    </div>
  );
};

export default Instellingen;