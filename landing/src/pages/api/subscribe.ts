import type { NextApiRequest, NextApiResponse } from 'next';

interface SubscribeResponse {
  message: string;
  error?: string;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SubscribeResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  // Validate email
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: 'error', error: 'Email is required' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'error', error: 'Invalid email format' });
  }

  try {
    const subscriberData = {
      id: crypto.randomUUID(),
      email: email.toLowerCase(),
      created_at: new Date().toISOString(),
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
    };

    // Log to console (visible in Vercel logs)
    console.log('🎉 NEW BETA SIGNUP:', JSON.stringify(subscriberData, null, 2));

    // Send webhook to a collection service if configured
    const webhookUrl = process.env.BETA_SIGNUP_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subscriberData),
        });
      } catch (webhookError) {
        console.error('Webhook error (non-blocking):', webhookError);
      }
    }

    return res.status(200).json({ message: 'success' });
  } catch (error) {
    console.error('Subscribe error:', error);
    return res.status(500).json({ message: 'error', error: 'Server error' });
  }
}
