const devices = [
  {
    android_id: "705121e036ceaa95",
    status: "0",
    is_banned: "0",
    feji_enabled: "0",
    can_use_feji: "0"
  },
    {
    android_id: "1db9f63e1983d079",
    status: "1",
    is_banned: "0",
    feji_enabled: "0",
    can_use_feji: "0"
  },
  {
    android_id: "69f292f7c9e58598",
    status: "0",
    is_banned: "0",
    feji_enabled: "0",
    can_use_feji: "0"
  },
    {
    android_id: "ddd0555c665c0440",
    status: "0",
    is_banned: "0",
    feji_enabled: "0",
    can_use_feji: "0"
  },
  {
    android_id: "b8c2900ebd3feacf",
    status: "1",
    is_banned: "0",
    feji_enabled: "0",
    can_use_feji: "0"
  },
  {
    android_id: "d5f09b7f35b8384e",
    status: "1",
    is_banned: "0",
    feji_enabled: "0",
    can_use_feji: "0"
  }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET') {
    return res.status(200).json({ data: devices });
  }

  if (req.method === 'POST') {
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
