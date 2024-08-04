const express = require('express');
const request = require('request');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/proxy/hackathons', (req, res) => {
  const url = 'https://devpost.com/api/hackathons';
  request(url).pipe(res);
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
