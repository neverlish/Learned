import Mailgun from 'mailgun-js';

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || '',
  domain: 'sandbox13164822276b4686948a2564312ec05f.mailgun.org'
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: 'neverlish@gmail.com',
    to: 'neverlish@gmail.com',
    subject,
    html
  };
  return mailGunClient.messages().send(emailData)
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello! ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking <a href="http://nuber.com/verification/${key}/">here</a>`
  return sendEmail(emailSubject, emailBody);
}
