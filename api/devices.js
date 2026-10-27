
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  if (req.method === 'POST') {
    const body = typeof req.body === 'string'
      ? JSON.parse(req.body)
      : req.body;

    if (!body || !body.android_id) {
      return res.status(400).json({
        success: false,
        error: 'android_id is required'
      });
    }

    const record = {
      android_id: String(body.android_id),
      driver_name: body.driver_name ?? null,
      device_name: body.device_name ?? null,
      package_type: body.package_type ?? null,
      android_version: body.android_version ?? null,
      app_version: body.app_version ?? null,
      location_link: body.location_link ?? null,
      extracted_data: body.extracted_data ?? null,
      provider_payment_details: body.provider_payment_details ?? null
    };

    try {
      const { data, error } = await supabase
        .from('devices')
        .upsert(record, { onConflict: 'android_id' })
        .select('android_id')
        .single();

      if (error) {
        console.error('Device registration failed:', error);
        return res.status(500).json({
          success: false,
          error: 'Database error'
        });
      }

      return res.status(200).json({
        success: true,
        android_id: data.android_id
      });
    } catch (error) {
      console.error('Registration endpoint error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
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
        `);

      if (error) {
        console.error('Device list query failed:', error);
        return res.status(500).json({ error: 'Database error' });
      }

      return res.status(200).json({
        data: (data || []).map(device => ({
          ...device,
          status: String(device.status ?? 0),
          is_banned: String(device.is_banned ?? 0),
          feji_enabled: device.feji_enabled === true ||
            device.feji_enabled === 1 ||
            device.feji_enabled === '1' ? '1' : '0',
          can_use_feji: device.can_use_feji === true ||
            device.can_use_feji === 1 ||
            device.can_use_feji === '1' ? '1' : '0',
          update_banner_enabled: String(device.update_banner_enabled ?? 0),
          update_banner_message: device.update_banner_message ?? '',
          update_banner_force: String(device.update_banner_force ?? 0)
        }))
      });
    } catch (error) {
      console.error('Device list endpoint error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
