const express = require('express');
const authControle = require('../middleware/auth');

const router = express.Router();

/** Neste arquivo eu fiz a validação de token, assim fazendo a autenticação, na rota
 *  get na raiz. Importanto o middleware/ auth. Assim estou fazendo o uso da jwt e o 
 *  token.   
 */
router.use(authControle);

router.get('/', (req, res) => {
  res.send({ Message: 'Validação de Token, Ok!', user: req.userId });
})

module.exports = app => app.use('/controle', router);