/** Mais uma vez aqui eu faço um require na aplicação que é onde está todos nossos modulos.
 *  Para assim poder usar no meu servidor e subir a aplicação.
 */
const app = require('./app');

/** Mais uma vez criei uma variavel passando a porta que eu quero onde fique rodando nossa
 *  aplicação. Port: 8080.
 */
const port = 8080;

/**Aqui é onde a "magica acontece". E assim nosso servidor esta rodando e poderá subir 
 * e ser consumido pela aplicação. 
 */
app.listen(process.env.PORT || port, function(){
  console.log('Servidor rodando na porta: ', port);
});
