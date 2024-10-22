import { v4 as uuidv4 } from 'uuid';
import { Klant } from '../types/Klant';

let klanten: Klant[] = [];

export const getKlanten = (): Klant[] => {
  return klanten;
};

export const getKlantById = (id: string): Klant | undefined => {
  return klanten.find(klant => klant.id === id);
};

export const createKlant = (klantData: Omit<Klant, 'id'>): Klant => {
  const newKlant: Klant = {
    id: uuidv4(),
    ...klantData,
  };
  klanten.push(newKlant);
  return newKlant;
};

export const updateKlant = (updatedKlant: Klant): Klant => {
  const index = klanten.findIndex(klant => klant.id === updatedKlant.id);
  if (index !== -1) {
    klanten[index] = updatedKlant;
    return updatedKlant;
  }
  throw new Error('Klant niet gevonden');
};

export const deleteKlant = (id: string): void => {
  klanten = klanten.filter(klant => klant.id !== id);
};

export const validateApiKey = (apiKey: string): string | null => {
  // Implementeer hier de logica voor API-sleutelvalidatie
  // Voor nu returnen we een standaard monteur e-mail
  return 'monteur1@vipinstallatie.nl';
};

// Veldbeheer functies
let fields: { id: string; name: string; isRequired: boolean; isVisible: boolean }[] = [
  { id: '1', name: 'Naam', isRequired: true, isVisible: true },
  { id: '2', name: 'E-mail', isRequired: true, isVisible: true },
  { id: '3', name: 'Telefoonnummer', isRequired: false, isVisible: true },
];

export const getFields = () => fields;

export const updateField = (id: string, updates: Partial<{ isRequired: boolean; isVisible: boolean }>) => {
  const fieldIndex = fields.findIndex(f => f.id === id);
  if (fieldIndex !== -1) {
    fields[fieldIndex] = { ...fields[fieldIndex], ...updates };
  }
};

export const addField = (field: { name: string; isRequired: boolean; isVisible: boolean }) => {
  fields.push({ id: uuidv4(), ...field });
};

export const removeField = (id: string) => {
  fields = fields.filter(f => f.id !== id);
};

export const createWebhookData = async (data: Partial<Klant>, apiKey: string): Promise<Klant | null> => {
  const monteurEmail = apiKey === 'zapier-default-key' ? 'monteur1@vipinstallatie.nl' : validateApiKey(apiKey);
  if (!monteurEmail) return null;

  const newKlant: Omit<Klant, 'id'> = {
    startDateTime: data.startDateTime || new Date().toISOString(),
    subject: data.subject || 'Nieuwe opdracht',
    bodyPreview: data.bodyPreview || '',
    locationDisplayName: data.locationDisplayName || '',
    organizerEmailAddress: data.organizerEmailAddress || '',
    address: data.address || '',
    endDateTime: data.endDateTime || '',
    createdDateTime: data.createdDateTime || new Date().toISOString(),
    afspraakDatum: data.startDateTime ? new Date(data.startDateTime).toISOString().split('T')[0] : '',
    ticketNummer: `T${new Date().getFullYear()}-${(klanten.length + 1).toString().padStart(4, '0')}`,
    klantInfo: data.klantInfo || '',
    plaats: data.plaats || '',
    planner: data.planner || '',
    afspraakDatumMonteur: data.afspraakDatumMonteur || '',
    eindeTijdvak: data.eindeTijdvak || '',
    opdrachtAangemaakt: new Date().toISOString(),
    ticketId: `${new Date().getFullYear()}-${(klanten.length + 1).toString().padStart(4, '0')}`,
    status: data.startDateTime ? 'Gepland' : 'In de wacht',
    monteur: monteurEmail,
    invoerbron: apiKey === 'zapier-default-key' ? 'API' : 'Formulier',
  };

  return createKlant(newKlant);
};