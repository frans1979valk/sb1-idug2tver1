export interface Klant {
  id: string;
  startDateTime: string;
  subject: string;
  bodyPreview: string;
  locationDisplayName: string;
  organizerEmailAddress: string;
  address: string;
  endDateTime: string;
  createdDateTime: string;
  afspraakDatum: string;
  ticketNummer: string;
  klantInfo: string;
  plaats: string;
  planner: string;
  afspraakDatumMonteur: string;
  eindeTijdvak: string;
  opdrachtAangemaakt: string;
  ticketId: string;
  status: 'Gepland' | 'Voltooid' | 'Klant niet thuis' | 'Geannuleerd' | 'Niet voltooid' | 'In de wacht';
  monteur: string;
  invoerbron: 'API' | 'Bulk' | 'Formulier' | 'Telefonisch';
}