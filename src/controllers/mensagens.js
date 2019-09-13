const express = require('express');
const authMiddleware = require('../middleware/auth');

const mensagem = require('../models/mensagem');

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
  try {
    const Mensagens = await mensagem.create(req.body);
    return res.send({ Mensagens });
  } catch (err) {
    return res.status(400).send({ error: 'Ocorreu algum problema no envio da sua mensagem.' });
  }
});

module.exports = (app) => app.use('/mensagem', router);
