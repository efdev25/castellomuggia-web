/**
 * Brevo (ex Sendinblue) Email Adapter
 * Questo file isola completamente la logica transazionale di email dal resto del codice.
 * Riferimento System Prompt: GDPR-native, nessun lock-in.
 */

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const API_KEY = import.meta.env.BREVO_API_KEY;

export interface EmailPayload {
  to: { email: string; name?: string }[];
  subject: string;
  htmlContent: string;
}

export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  if (!API_KEY) {
    console.warn('Brevo API key non impostata. Email non inviata in dev:', payload.subject);
    return false;
  }

  try {
    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': API_KEY,
      },
      body: JSON.stringify({
        sender: { name: 'Castello di Muggia', email: 'no-reply@castellomuggia.eu' },
        ...payload
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Errore Brevo:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Eccezione invio email:', error);
    return false;
  }
}
