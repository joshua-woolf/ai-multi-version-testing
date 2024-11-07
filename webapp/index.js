const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/config', (req, res) => {
  const queryVersion = req.query.version;
  const webVersion = queryVersion || process.env.WEB_VERSION || '2'; // Default to v2
  const apiVersion = queryVersion || '1'; // Default to v1 for API

  res.json({
    webVersion: webVersion,
    apiVersion: apiVersion
  });
});

app.listen(port, () => {
  console.log(`Webapp running on port ${port}`);
});
