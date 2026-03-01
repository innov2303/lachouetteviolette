// Resend integration for sending emails
import { Resend } from 'resend';

const RECIPIENT_EMAIL = "mam.lachouetteviolette@gmail.com";

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? 'repl ' + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
    ? 'depl ' + process.env.WEB_REPL_RENEWAL
    : null;

  if (!xReplitToken) {
    throw new Error('X-Replit-Token not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=resend',
    {
      headers: {
        'Accept': 'application/json',
        'X-Replit-Token': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key)) {
    throw new Error('Resend not connected');
  }
  return { apiKey: connectionSettings.settings.api_key, fromEmail: connectionSettings.settings.from_email };
}

async function getUncachableResendClient() {
  const { apiKey, fromEmail } = await getCredentials();
  return {
    client: new Resend(apiKey),
    fromEmail
  };
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    const { client, fromEmail } = await getUncachableResendClient();
    await client.emails.send({
      from: fromEmail,
      to: RECIPIENT_EMAIL,
      subject: `Nouveau message de contact - ${data.name}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom :</strong> ${data.name}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Téléphone :</strong> ${data.phone}</p>` : ''}
        <hr />
        <p><strong>Message :</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `
    });
    console.log('Contact email sent successfully');
  } catch (err) {
    console.error('Failed to send contact email:', err);
  }
}

export async function sendPreinscriptionEmail(data: {
  lastName: string;
  firstName: string;
  address: string;
  email: string;
  phone: string;
  familySituation: string;
  familySituationOther?: string;
  employment: string;
  childName: string;
  childBirthdate: string;
  hasSiblings: boolean;
  onWaitingList: boolean;
  startDate: string;
  scheduleDays: string;
  expectations?: string;
}) {
  try {
    const { client, fromEmail } = await getUncachableResendClient();
    await client.emails.send({
      from: fromEmail,
      to: RECIPIENT_EMAIL,
      subject: `Nouvelle pré-inscription - ${data.firstName} ${data.lastName}`,
      html: `
        <h2>Nouvelle demande de pré-inscription</h2>
        <h3>Informations du parent</h3>
        <p><strong>Nom :</strong> ${data.lastName}</p>
        <p><strong>Prénom :</strong> ${data.firstName}</p>
        <p><strong>Adresse :</strong> ${data.address}</p>
        <p><strong>Email :</strong> ${data.email}</p>
        <p><strong>Téléphone :</strong> ${data.phone}</p>
        <p><strong>Situation familiale :</strong> ${data.familySituation}${data.familySituationOther ? ` (${data.familySituationOther})` : ''}</p>
        <p><strong>Emploi :</strong> ${data.employment}</p>
        <hr />
        <h3>Informations de l'enfant</h3>
        <p><strong>Prénom de l'enfant :</strong> ${data.childName}</p>
        <p><strong>Date de naissance :</strong> ${data.childBirthdate}</p>
        <p><strong>Frères et sœurs :</strong> ${data.hasSiblings ? 'Oui' : 'Non'}</p>
        <p><strong>Sur liste d'attente en crèche :</strong> ${data.onWaitingList ? 'Oui' : 'Non'}</p>
        <hr />
        <h3>Accueil souhaité</h3>
        <p><strong>Date de début :</strong> ${data.startDate}</p>
        <p><strong>Jours et horaires :</strong> ${data.scheduleDays}</p>
        ${data.expectations ? `<p><strong>Attentes :</strong></p><p>${data.expectations.replace(/\n/g, '<br>')}</p>` : ''}
      `
    });
    console.log('Preinscription email sent successfully');
  } catch (err) {
    console.error('Failed to send preinscription email:', err);
  }
}
