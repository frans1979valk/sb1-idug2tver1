import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Klant } from '../types/Klant';
import { createKlant } from '../services/api';

const ExcelUpload: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadResult(null);

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        let successCount = 0;
        let errorCount = 0;

        for (const row of data) {
          try {
            const klant: Omit<Klant, 'id'> = {
              startDateTime: row['Start Date Time'],
              subject: row['Subject'],
              bodyPreview: row['Body Preview'],
              locationDisplayName: row['Location Display Name'],
              organizerEmailAddress: row['Organizer Email Address'],
              address: row['Address'],
              endDateTime: row['End Date Time'],
              createdDateTime: row['Created Date Time'],
              afspraakDatum: row['Afspraak datum'],
              ticketNummer: row['Ticketnummer'],
              klantInfo: row['Klant info'],
              plaats: row['Plaats'],
              planner: row['Planner'],
              afspraakDatumMonteur: row['Afspraak datum monteur'],
              eindeTijdvak: row['Einde tijdvak'],
              opdrachtAangemaakt: row['Opdrachtaangemaakt'],
              ticketId: row['Ticket-ID'],
              status: row['Start Date Time'] ? 'Gepland' : 'In de wacht',
              monteur: row['Monteur'] || 'monteur1@vipinstallatie.nl',
              invoerbron: 'Bulk',
            };

            await createKlant(klant);
            successCount++;
          } catch (error) {
            console.error('Fout bij het verwerken van rij:', error);
            errorCount++;
          }
        }

        setUploadResult(`Upload voltooid. Succesvol: ${successCount}, Mislukt: ${errorCount}`);
      } catch (error) {
        console.error('Fout bij het verwerken van het Excel-bestand:', error);
        setUploadResult('Er is een fout opgetreden bij het verwerken van het bestand.');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Excel Upload</h2>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        disabled={uploading}
        className="mb-2"
      />
      {uploading && <p>Bezig met uploaden...</p>}
      {uploadResult && <p>{uploadResult}</p>}
    </div>
  );
};

export default ExcelUpload;