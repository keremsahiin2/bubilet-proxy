const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/bubilet', async (req, res) => {
  if (req.headers['x-secret'] !== process.env.SECRET)
    return res.status(401).json({ error: 'Yetkisiz' });
  try {
    const { url, method, headers, data } = req.body;
    const response = await axios({ url, method: method||'POST', headers, data, timeout: 15000 });
    res.json({ status: response.status, data: response.data });
  } catch(e) {
    res.status(e.response?.status||500).json({ error: e.message, data: e.response?.data });
  }
});

app.get('/health', (req, res) => res.json({ ok: true }));
app.listen(process.env.PORT || 3099, () => console.log('Proxy hazir'));