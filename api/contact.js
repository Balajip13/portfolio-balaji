import nodemailer from 'nodemailer';

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { name, email, message } = req.body || {};

    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedEmail = typeof email === 'string' ? email.trim() : '';
    const trimmedMessage = typeof message === 'string' ? message.trim() : '';

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return res.status(400).json({ success: false, message: 'Unable to send message' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ success: false, message: 'Unable to send message' });
    }

    if (trimmedName.length > 100 || trimmedEmail.length > 150 || trimmedMessage.length > 5000) {
      return res.status(400).json({ success: false, message: 'Unable to send message' });
    }

    const sanitizedName = sanitize(trimmedName);
    const sanitizedEmail = sanitize(trimmedEmail);
    const sanitizedMessage = sanitize(trimmedMessage);

    const origin = req.headers.origin || req.headers.referer || 'Unknown';
    const date = new Date().toLocaleString('en-US', { timeZone: 'UTC' }) + ' UTC';

    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.SMTP_PORT || '465', 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const receiver = process.env.CONTACT_RECEIVER || 'balajics1382@gmail.com';

    if (!user || !pass) {
      console.error('SMTP Error: Environment variables SMTP_USER or SMTP_PASS are not configured.');
      return res.status(500).json({ success: false, message: 'Unable to send message' });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const emailBody = `Name: ${sanitizedName}

Email: ${sanitizedEmail}

Message:
${sanitizedMessage}

Portfolio URL:
${origin}

Timestamp:
${date}`;

    await transporter.sendMail({
      from: `"${sanitizedName}" <${user}>`,
      to: receiver,
      replyTo: sanitizedEmail,
      subject: 'New Portfolio Contact Message',
      text: emailBody,
    });

    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('SMTP Send Error:', error);
    return res.status(500).json({ success: false, message: 'Unable to send message' });
  }
}
