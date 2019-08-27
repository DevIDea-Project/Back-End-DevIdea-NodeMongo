const express = require('express');
const authControle = require('../middleware/auth');

const router = express.Router();

router.use(authControle);

router.get('/', (req, res) => {
  res.send({ ok: true });
})

module.exports = app => app.use('/controle', router);