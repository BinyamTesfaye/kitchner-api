const devices = [
  {
    android_id: "705121e036ceaa95",
    status: "0",
    is_banned: "0",
    feji_enabled: "0",
    can_use_feji: "0",
    update_banner_enabled: "0",
    update_banner_message: "",
    update_banner_force: "0"
  },
  {
    android_id: "69f292f7c9e58598", //me
    status: "1",
    is_banned: "0",
    feji_enabled: "0",
    can_use_feji: "0",
    update_banner_enabled: "0",
    update_banner_message: "",
    update_banner_force: "0"
  },
  {
    android_id: "ddd0555c665c0440",
    status: "1",
    is_banned: "0",
    feji_enabled: "0",
    can_use_feji: "0",
    update_banner_enabled: "0",
    update_banner_message: "",
    update_banner_force: "0"
  },
  {
    android_id: "b8c2900ebd3feacf",
    status: "1",
    is_banned: "0",
    feji_enabled: "0",
    can_use_feji: "0",
    update_banner_enabled: "0",
    update_banner_message: "",
    update_banner_force: "0"
  },
  {
    android_id: "d5f09b7f35b8384e",
    status: "1",
    is_banned: "0",
    feji_enabled: "0",
    can_use_feji: "0",
    update_banner_enabled: "0",
    update_banner_message: "",
    update_banner_force: "0"
  },
  {
    android_id: "a96d14d3db632e07",
    status: "1",
    is_banned: "0",
    feji_enabled: "0",
    can_use_feji: "0",
    update_banner_enabled: "0",
    update_banner_message: "",
    update_banner_force: "0"
  }
];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { androidId } = req.query;
  const device = devices.find(d => d.android_id === androidId);

  if (!device) {
    return res.status(404).json({ error: 'Device not found' });
  }

  return res.status(200).json({ data: device });
}