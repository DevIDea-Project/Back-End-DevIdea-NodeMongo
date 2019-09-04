const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {

  const authHeader = req.headers.authorization;
  
  if (!authHeader)
  return res.status(401).send({ error:'Não tem o token!' });

  const parts = authHeader.split(' ');

  if(!parts.length === 2) 
    return res.status(401).send({ error: 'Erro no Token! ' });

  const [ scheme, token ] = parts;
  
  if (!/^Bearer$/i.test(scheme)) 
  return res.status(401).send({error:'Token mal formado.'});

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token Invalido' })

    /** Estava ocasionando erro, pelo fato de está colocando: req.user.id = decoded.id. Quando
     * o correto é: req.userId = decoded.id (req.userId é uma variavel).
     */
    req.userId = decoded.id;
    return next();
  })
};
