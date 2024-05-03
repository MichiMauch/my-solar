//require('dotenv').config();
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
        'x-authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjMzMDczYmY4MGVhYjdiNGFhOTM4ODQyNGRiYTNiODE0In0.eyJ1aWQiOiIyNDQ4NjciLCJ0b2tlbl90eXBlIjoiZGVmYXVsdCIsImlzcyI6InZybWFwaS52aWN0cm9uZW5lcmd5LmNvbSIsImF1ZCI6Imh0dHBzOi8vdnJtYXBpLnZpY3Ryb25lbmVyZ3kuY29tLyIsImlhdCI6MTcxNDY3ODcwNCwiZXhwIjoxNzE0NzY1MTA0LCJqdGkiOiIzMzA3M2JmODBlYWI3YjRhYTkzODg0MjRkYmEzYjgxNCJ9.t8HH9J1ADh3-iKqa67IT0FwsFyMwk8PQ1X-cy-XaWJzaDXhKA82nWB_GNbC0mgSxTAxXFJRAQ19sE0Q2C_Ufu-fkjQBJYSMu_s3pvWuFL7UndwgBofwde756neT83sCPdmOZsoLA1bwHacQ6J8iWTAAU8VdTC7CnRVzAaViexyaJuMG-bjmnS0itBV-koAWJg-CW_ZtxUBNoPcaX4UmgGqn2Mzw5HC_RMCW8lamuDMXTpJZsMAIbq6rIXwphdpiAFrNfr6QE1xARh7FPv2gg3fXntZdB6wMBsyAi8S3S-fHCdeAHw4Y44NZi990CsLjq938ZJVxCKTNCZqWFekj3pw`
    }
  };

  try {
    const response = await axios.request(config);
    const data = response.data.records;
    const currentPower = data.Pdc[data.Pdc.length - 1][1];
    const batteryCharge = data.bs[data.bs.length - 1][1];
    res.json({ currentPower: currentPower, batteryCharge: batteryCharge });
  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
    res.status(500).send('Serverfehler');
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
