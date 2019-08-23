const express = require('express');
const User = require('../models/users');
//const User = require('../config/connectDb');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.send({ user })
  } 
  catch (err) {
    return res.status(400).send({ error: 'Falha ao enviar usuario!' });
  }
});

module.exports = (app) => app.use('/auth', router);
