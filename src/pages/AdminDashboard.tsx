import React from 'react';
import { useUser } from '../contexts/UserContext';
import { Klant } from '../types/Klant';
import ExcelUpload from '../components/ExcelUpload';
import AdminFieldManagement from '../components/AdminFieldManagement';

interface AdminDashboardProps {
  klanten: Klant[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ klanten }) => {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Welkom, {user?.name}</h2>
      
      <section>
        <h3 className="text-xl font-semibold mb-2">Klantenoverzicht</h3>
        <p>Totaal aantal klanten: {klanten.length}</p>
        {/* Hier kun je een tabel of lijst toevoegen met klantgegevens */}
      </section>
      
      <section>
        <h3 className="text-xl font-semibold mb-2">Klanten Importeren</h3>
        <ExcelUpload />
      </section>
      
      <section>
        <AdminFieldManagement />
      </section>
      
      <section>
        <h3 className="text-xl font-semibold mb-2">Statistieken en Rapportages</h3>
        <p>Hier komen statistieken en rapportages</p>
      </section>
    </div>
  );
};

export default AdminDashboard;