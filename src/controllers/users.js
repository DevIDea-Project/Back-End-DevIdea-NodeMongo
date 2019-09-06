/** Fiz as requisições de todos os modulos que vou usar neste arquivo.
 *  Express: Vai cuidar de todo roteamento; bcrypt: Vai criptografar todas as senhas;
 *  Jwt: Vai gerar um token, para ser usado apenas por aquele usuario; Mailer: É um 
 *  modulo que estou usando para fazer o teste de recuperação de senha, no mailerStrap.
*/
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../modules/mailer');

/** Aqui estou fazendo uma requisição na rota: Models/Users. Onde está meu Schema com 
 *  o mongoose onde passo o que quero que seja salvo no mongoDB. authConfig: Está 
 *  o segredo que vou usar mais uma vez aqui na aplicação.
 */
const User = require('../models/users');
const authConfig = require('../config/auth');

/** Primeiro eu faço atribuo o router com o valor do express.Router(), e assim uso a 
 * variavel router em todas as rotas da API.
 */
const router = express.Router();

/** Faço a função onde eu vou usar o token. No sign e passando os paramentros: 
 *  authConfig juntamente com o secret. Depois passo também o tempo que o token 
 *  vai espirar.2
 */
function generateToken(params = {}) {
  return jwt.sign( params, authConfig.secret, {
    expiresIn: 86400,
  });
}

/** Na rota de registro eu faço uma async e pegando o email como principal, por no meu 
 * Scheme ele ficou como identificador. Não coloquei o ID pelo fato do Id ser gerado pelo
 * mongoose e ele vem em um formato não tão familiar. Fiz um try no usuario, com o metodo 
 * findOne passando o Email dentro do json. Se vier como o erro eu envio um send de uma msg 
 * de erro. Depois faço um await no usuario e crio um req.body. Depois pegou este usuario
 * e atribou um password indefinido. Depois faço um retorno enviando o usuario e o token com 
 * o id. Caos
 */
router.post('/register', async (req, res) => {
 
  const { email } = req.body;

  try {
    if(await User.findOne({ email }))
      return res.status(400).send({ error: 'Usuario já existe!'});

    const user = await User.create(req.body);

    user.password = undefined;
    
    return res.send({ 
      user,
      token: generateToken({ id: user.id }),
    });
  } 
  catch (err) {
    return res.status(400).send({ error: 'Falha ao enviar usuario!' });
  }
});

/** Na rota de autenticação eu envio um post de um usuario assim eu faço a autenticação.
 *  passando o email e o password. Caso ocorra algum erro ele retorna uma status code 400.
 * e informa o erro: Usuario não existe! Mais uma vez eu criptografo a senha do usuario.
 */
router.post('/authenticate', async (req, res) =>{
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if(!user) 
  return res.status(400).send({error: 'Usuario não existe!'});

  if(!await bcrypt.compare(password, user.password))
  return res.status(400).send({ error: 'Senha não bate com o usuario! ' });

  user.password = undefined;

  res.send({ 
    user, 
    token: generateToken({ id: user.id }),
  });

});


/** Recuperação de Password. Caso o usuario tenha perdido ou esquecido sua senha.
 *  Primeiro eu uso mais uma vez o email como chave primaria, pela questao do id ser o d
 *  mongoose.Aqui eu uso o modulo do mailer.Assim posso enviar um email ficticio para o mailer.
 *  E la envio o token com o acesso para o usuario recuperar a senha.
 */
router.post('/forgot_password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if(!user) return res.status(400).send({ error: 'Usuario não existe!' });
    
    const token = crypto.randomBytes(20).toString('hex');
    
    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      '$set':{
        passwordResetToken: token,
        passwordResetExpires: now,
      }
    });

    mailer.sendMail({
      to: email,
      from: 'brunoviniciustica@gmail.com',
      template: 'auth/forgot_password',
      context: { token },
    }, (err) => {
        if(err) 
        return res.status(400).send({error: 'Erro no Token'});
     
      return res.send();
    });

  } catch (err) {
    res.status(400).send({ error: 'Error on forgot password, try again!' })
  }
});


/** Aqui eu recupero a senha do usuario, logo ele poderá informar uma nova senha. */
router.post('/reset_password', async (req, res) => {
  const { email , token, password } = req.body;

  try{
    const user = await User.findOne({ email })
      .select('+passwordResetToken passwordResetExpires');

      if (!user) return res.status(400).send({ error: 'Usuario não existe!' });

      if(token !== user.passwordResetToken)
      return res.status(400).send({error: 'Token invalid'});

      const now = new Date();

      if(now > user.passwordResetExpires)
      res.status(400).send({error: 'Token experid, generate a new one'});

      user.password = password;

      await user.save();

      res.send();

    } catch(err) {
    res.status(400).send({error: 'Cannot reset password, try again!'})
  }

});

/** Aqui eu exporto o module ./auth, passando o router como parametro também. */
module.exports = app => app.use('/auth', router);
