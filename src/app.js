const express = require('express');
const consign = require('consign');

const app = express();

consign({ cwd: 'src', verbose: false })
  .include('./config/middlewares.js')
  .then('./controllers')
  .then('./middleware/auth')
  .then('./database')
  .then('./models/users')
  .then('modules')
  .then('resources')
  .into(app);

app.get('/', (req, res) => {
  res.send('OK');
});

app.use((err, req, res, next) => {
  const { name, message, stack } = err;
  if (name === 'ValidationError') res.status(400).json({ error: message });
  if (name === 'RecursosIndevidoError') res.status(403).json({ error: message });
  else res.status(500).json({ name, message, stack });
  next(err);
});

module.exports = app;