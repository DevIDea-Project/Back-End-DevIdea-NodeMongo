/** Aqui faço os importes que seram usados. Express framework para ajudar no roteamento dos 
 *  chamadas: GET, PUT, POST, DELETE E POR AI VAI. O Consign é um frame que nos ajuda para 
 *  deixar o codigo um pouco menos verboso e ai chamar todos nossos modulos para dentro da
 *  nossa aplicação.
 */
const express = require('express');
const consign = require('consign');

/** Aqui estou inicializando o express. */
const app = express();

/** Olha aqui o consign trabalhando, veja que eu digo o CWD e deixo verbose como false, 
 *  Depois eu vou incluindo todos os modulos da aplicação e no final coloco: into(app);
 */
consign({ cwd: 'src', verbose: false })
  .include('./config/middlewares.js')
  .then('./controllers')
  .then('./middleware/auth')
  .then('./models/connectDb')
  .then('./models/users')
  .then('modules')
  .then('resources/mail/auth/forgot_password')
  .into(app);

/** Chamada get na rota Raiz. Apenas para teste. */
app.get('/', (req, res) => {
  res.send('OK');
});

/** Essa logica que usei foi apenas para validar e evitar que quando o usuario navega para outra 
 *  rota apareça a mensagem de erro: 400. Avisando que aquela rota não é reconhecida pela
 *  aplicação.
 */
app.use((err, req, res, next) => {
  const { name, message, stack } = err;
  if (name === 'ValidationError') res.status(400).json({ error: message });
  if (name === 'RecursosIndevidoError') res.status(403).json({ error: message });
  else res.status(500).json({ name, message, stack });
  next(err);
});

module.exports = app;