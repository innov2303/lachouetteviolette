// Resend integration for sending emails
// Supports both Replit integration (dev) and standalone RESEND_API_KEY (prod on Debian)
import { Resend } from 'resend';

const RECIPIENT_EMAIL = "mam.lachouetteviolette@gmail.com";
const BCC_EMAIL = "jessicabonnel31@gmail.com";
const SENDER_NAME = "La chouette violette";
const BRAND_COLOR = "#c9a0dc";
const FROM_EMAIL = "noreply@lachouetteviolette.fr";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set');
  }
  return new Resend(apiKey);
}

function emailLayout(title: string, content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f8f7fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f7fa; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06);">
          <tr>
            <td style="background: linear-gradient(135deg, ${BRAND_COLOR}, #a97bc4); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: 0.5px;">${SENDER_NAME}</h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 13px; letter-spacing: 1px; text-transform: uppercase;">Maison d'Assistantes Maternelles</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 40px;">
              <h2 style="margin: 0 0 24px; color: #2d2d2d; font-size: 20px; font-weight: 600; border-bottom: 2px solid ${BRAND_COLOR}; padding-bottom: 12px;">${title}</h2>
              ${content}
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8f7fa; padding: 20px 40px; text-align: center; border-top: 1px solid #eee;">
              <p style="margin: 0; color: #999; font-size: 12px;">${SENDER_NAME} &mdash; Maison d'Assistantes Maternelles</p>
              <p style="margin: 4px 0 0; color: #bbb; font-size: 11px;">Ce message a &eacute;t&eacute; envoy&eacute; automatiquement depuis le site web.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function fieldRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding: 8px 12px; color: #777; font-size: 13px; font-weight: 600; white-space: nowrap; vertical-align: top; width: 160px;">${label}</td>
      <td style="padding: 8px 12px; color: #2d2d2d; font-size: 14px; vertical-align: top;">${value}</td>
    </tr>`;
}

function sectionTitle(title: string): string {
  return `<h3 style="margin: 24px 0 12px; color: ${BRAND_COLOR}; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">${title}</h3>`;
}

function fieldsTable(rows: string): string {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #f0ecf3; border-radius: 8px; overflow: hidden; margin-bottom: 16px;">${rows}</table>`;
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  try {
    const client = getResendClient();
    const content = `
      ${fieldsTable(
        fieldRow("Nom", data.name) +
        fieldRow("Email", `<a href="mailto:${data.email}" style="color: ${BRAND_COLOR}; text-decoration: none;">${data.email}</a>`) +
        (data.phone ? fieldRow("T&eacute;l&eacute;phone", data.phone) : '')
      )}
      ${sectionTitle("Message")}
      <div style="background-color: #faf8fc; border-left: 3px solid ${BRAND_COLOR}; padding: 16px 20px; border-radius: 0 8px 8px 0; color: #444; font-size: 14px; line-height: 1.7;">
        ${data.message.replace(/\n/g, '<br>')}
      </div>
    `;

    console.log(`Sending contact email: from=${FROM_EMAIL}, to=${RECIPIENT_EMAIL}, bcc=${BCC_EMAIL}`);
    const result = await client.emails.send({
      from: `${SENDER_NAME} <${FROM_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      bcc: BCC_EMAIL,
      subject: `Nouveau message de contact - ${data.name}`,
      html: emailLayout("Nouveau message de contact", content)
    });
    console.log('Contact email result:', JSON.stringify(result));
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
    const client = getResendClient();
    const content = `
      ${sectionTitle("Informations du parent")}
      ${fieldsTable(
        fieldRow("Nom", data.lastName) +
        fieldRow("Pr&eacute;nom", data.firstName) +
        fieldRow("Adresse", data.address.replace(/\n/g, '<br>')) +
        fieldRow("Email", `<a href="mailto:${data.email}" style="color: ${BRAND_COLOR}; text-decoration: none;">${data.email}</a>`) +
        fieldRow("T&eacute;l&eacute;phone", data.phone) +
        fieldRow("Situation familiale", data.familySituation + (data.familySituationOther ? ` (${data.familySituationOther})` : '')) +
        fieldRow("Emploi", data.employment)
      )}
      ${sectionTitle("Informations de l'enfant")}
      ${fieldsTable(
        fieldRow("Pr&eacute;nom", data.childName) +
        fieldRow("Date de naissance", data.childBirthdate) +
        fieldRow("Fr&egrave;res et s&oelig;urs", data.hasSiblings ? 'Oui' : 'Non') +
        fieldRow("Liste d'attente cr&egrave;che", data.onWaitingList ? 'Oui' : 'Non')
      )}
      ${sectionTitle("Accueil souhait&eacute;")}
      ${fieldsTable(
        fieldRow("Date de d&eacute;but", data.startDate) +
        fieldRow("Jours et horaires", data.scheduleDays)
      )}
      ${data.expectations ? `
        ${sectionTitle("Attentes")}
        <div style="background-color: #faf8fc; border-left: 3px solid ${BRAND_COLOR}; padding: 16px 20px; border-radius: 0 8px 8px 0; color: #444; font-size: 14px; line-height: 1.7;">
          ${data.expectations.replace(/\n/g, '<br>')}
        </div>
      ` : ''}
    `;

    console.log(`Sending preinscription email: from=${FROM_EMAIL}, to=${RECIPIENT_EMAIL}, bcc=${BCC_EMAIL}`);
    const result = await client.emails.send({
      from: `${SENDER_NAME} <${FROM_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      bcc: BCC_EMAIL,
      subject: `Nouvelle pr\u00e9-inscription - ${data.firstName} ${data.lastName}`,
      html: emailLayout("Nouvelle demande de pr\u00e9-inscription", content)
    });
    console.log('Preinscription email result:', JSON.stringify(result));
  } catch (err) {
    console.error('Failed to send preinscription email:', err);
  }
}
