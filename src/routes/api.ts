import express from 'express';
import { createWebhookData, validateApiKey } from '../services/api';

const router = express.Router();

router.post('/webhook', async (req, res) => {
  const apiKey = req.headers['x-api-key'] as string;
  if (!apiKey) {
    return res.status(401).json({ error: 'API-sleutel ontbreekt' });
  }

  const monteurEmail = validateApiKey(apiKey);
  if (!monteurEmail) {
    return res.status(401).json({ error: 'Ongeldige API-sleutel' });
  }

  try {
    const newKlant = await createWebhookData(req.body, apiKey);
    if (newKlant) {
      res.status(201).json(newKlant);
    } else {
      res.status(400).json({ error: 'Fout bij het aanmaken van de klant' });
    }
  } catch (error) {
    console.error('Fout in webhook:', error);
    res.status(500).json({ error: 'Interne serverfout' });
  }
});

// Nieuwe route voor Zapier-integratie
router.post('/zapier-webhook', async (req, res) => {
  try {
    const zapierData = req.body;
    const newKlant = await createWebhookData({
      startDateTime: zapierData.Start_Date_Time,
      subject: zapierData.Subject,
      bodyPreview: zapierData.Body_Preview,
      locationDisplayName: zapierData.Location_Display_Name,
      organizerEmailAddress: zapierData.Organizer_Email_Address,
      endDateTime: zapierData.End_Date_Time,
      createdDateTime: zapierData.Created_Date_Time,
      address: zapierData.Address,
    }, 'zapier-default-key');

    if (newKlant) {
      res.status(201).json(newKlant);
    } else {
      res.status(400).json({ error: 'Fout bij het aanmaken van de klant via Zapier' });
    }
  } catch (error) {
    console.error('Fout in Zapier webhook:', error);
    res.status(500).json({ error: 'Interne serverfout' });
  }
});

export default router;