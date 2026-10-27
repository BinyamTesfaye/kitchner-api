
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const androidId = Array.isArray(req.query.androidId)
    ? req.query.androidId[0]
    : req.query.androidId;

  if (!androidId) {
    return res.status(400).json({ error: 'Missing Android ID' });
  }

  try {
    const { data: device, error } = await supabase
      .from('devices')
      .select(`
        android_id,
        status,
        is_banned,
        feji_enabled,
        can_use_feji,
        update_banner_enabled,
        update_banner_message,
        update_banner_force
      `)
      .eq('android_id', androidId)
      .maybeSingle();

    if (error) {
      console.error('Supabase status lookup failed:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }

    return res.status(200).json({
      data: {
        android_id: device.android_id,
        status: String(device.status ?? 0),
        is_banned: String(device.is_banned ?? 0),
        feji_enabled: String(device.feji_enabled ?? 0),
        can_use_feji: String(device.can_use_feji ?? 0),
        update_banner_enabled: String(
          device.update_banner_enabled ?? 0
        ),
        update_banner_message: device.update_banner_message ?? '',
        update_banner_force: String(
          device.update_banner_force ?? 0
        )
      }
    });
  } catch (err) {
    console.error('Status endpoint error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
