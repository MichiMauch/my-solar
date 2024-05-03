require('dotenv').config();
const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://vrmapi.victronenergy.com/v2/installations/193415/stats?interval=15mins',
  headers: { 
    'x-authorization': `Bearer ${process.env.BEARER_TOKEN}`
}
};

axios.request(config)
.then((response) => {
  // Stellen Sie sicher, dass Sie den Pfad zu den aktuellen Wattwerten anpassen, basierend auf der genauen Antwortstruktur Ihrer API
  const currentPower = response.data.records.Pdc[response.data.records.Pdc.length - 1][1];
  console.log(`Aktuelle Leistung: ${currentPower} Watt`);
})
.catch((error) => {
  console.error('Fehler beim Abrufen der Daten:', error);
});