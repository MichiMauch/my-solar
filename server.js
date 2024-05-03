require('dotenv').config();
console.log(`Bearer Token: ${process.env.BEARER_TOKEN}`); // Debugging-Zeile


const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public')); // für statische Dateien wie HTML, CSS und JS

app.get('/solar-status', async (req, res) => {
  let config = {
    method: 'get',
    url: 'https://vrmapi.victronenergy.com/v2/installations/193415/stats?interval=15mins',
    headers: { 
        'x-authorization': `Bearer ${process.env.BEARER_TOKEN}`
    }
  };

  try {
    const response = await axios.request(config);
    console.log('API Response:', response);  // Log the whole response object
    const data = response.data.records;
    const currentPower = data.Pdc[data.Pdc.length - 1][1];
    const batteryCharge = data.bs[data.bs.length - 1][1];
    res.json({ currentPower: currentPower, batteryCharge: batteryCharge });
  } catch (error) {
    console.error('Complete Error:', error.response);  // Log the complete error response
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
