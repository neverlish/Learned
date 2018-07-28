import MailGun from 'mailgun-js';

const mailGunClient = new MailGun({
  apiKey: process.env.MAILGUN_API_KEY || '',
  domain: 'sandbox13164822276b4686948a2564312ec05f.mailgun.org'
});
