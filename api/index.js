const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const summerData = [
  { day: 'Monday', temp: 25, condition: 'Sunny' },
  { day: 'Tuesday', temp: 27, condition: 'Clear' },
  { day: 'Wednesday', temp: 26, condition: 'Partly Cloudy' },
  { day: 'Thursday', temp: 28, condition: 'Sunny' },
  { day: 'Friday', temp: 24, condition: 'Clear' }
];

const winterData = [
  { day: 'Monday', temp: -2, condition: 'Snow' },
  { day: 'Tuesday', temp: -5, condition: 'Blizzard' },
  { day: 'Wednesday', temp: 0, condition: 'Cloudy' },
  { day: 'Thursday', temp: -3, condition: 'Snow' },
  { day: 'Friday', temp: -1, condition: 'Sleet' }
];

const version = process.env.API_VERSION || '1';
const weatherData = version === '1' ? summerData : winterData;

app.get('/weather', (req, res) => {
  res.json(weatherData);
});

app.listen(port, () => {
  console.log(`API v${version} running on port ${port}`);
});