import React from 'react';
import { Klant } from '../types/Klant';

interface KlantKaartProps {
  klant: Klant;
}

const KlantKaart: React.FC<KlantKaartProps> = ({ klant }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{klant.subject}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p><strong>Ticket ID:</strong> {klant.ticketId}</p>
          <p><strong>Status:</strong> {klant.status}</p>
          <p><strong>Monteur:</strong> {klant.monteur}</p>
          <p><strong>Afspraak Datum:</strong> {klant.afspraakDatum}</p>
          <p><strong>Locatie:</strong> {klant.locationDisplayName}</p>
        </div>
        <div>
          <p><strong>Klant Info:</strong> {klant.klantInfo}</p>
          <p><strong>Adres:</strong> {klant.address}</p>
          <p><strong>Planner:</strong> {klant.planner}</p>
          <p><strong>Invoerbron:</strong> {klant.invoerbron}</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Opdrachtdetails</h3>
        <p>{klant.bodyPreview}</p>
      </div>
    </div>
  );
};

export default KlantKaart;