import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import KlantKaart from '../components/KlantKaart';
import StatusWijziger from '../components/StatusWijziger';
import BestandUpload from '../components/BestandUpload';
import BestandWeergave from '../components/BestandWeergave';
import { Klant } from '../types/Klant';
import { getKlantById, updateKlant } from '../services/api';

const KlantDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [klant, setKlant] = useState<Klant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<{ url: string; type: string } | null>(null);

  useEffect(() => {
    const fetchKlant = async () => {
      if (id) {
        try {
          const data = await getKlantById(id);
          if (data) {
            setKlant(data);
          } else {
            console.error('Klant niet gevonden');
            navigate('/');
          }
        } catch (error) {
          console.error('Fout bij het ophalen van klantgegevens:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchKlant();
  }, [id, navigate]);

  const handleStatusWijziging = async (nieuweStatus: Klant['status']) => {
    if (klant) {
      const updatedKlant = { ...klant, status: nieuweStatus };
      try {
        await updateKlant(updatedKlant);
        setKlant(updatedKlant);
      } catch (error) {
        console.error('Fout bij het updaten van de klantstatus:', error);
      }
    }
  };

  const handleFileUpload = (file: File) => {
    const fileURL = URL.createObjectURL(file);
    setUploadedFile({ url: fileURL, type: file.type });
    console.log(`Bestand geüpload: ${file.name}`);
  };

  if (isLoading) {
    return <div>Laden...</div>;
  }

  if (!klant) {
    return <div>Klant niet gevonden</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Klantdetails</h1>
      <div className="mb-4">
        <StatusWijziger werkbon={klant} onStatusWijziging={handleStatusWijziging} />
      </div>
      <KlantKaart klant={klant} />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Bestanden</h2>
        <BestandUpload onUpload={handleFileUpload} />
        {uploadedFile && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Geüpload bestand</h3>
            <BestandWeergave bestandURL={uploadedFile.url} bestandType={uploadedFile.type} />
          </div>
        )}
      </div>
    </div>
  );
};

export default KlantDetails;