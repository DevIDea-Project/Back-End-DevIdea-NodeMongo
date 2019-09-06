/**Aqui faço o importe do module mongoose, assim podendo usar na conexão do banco
 * e no Schema.
 */
const mongoose = require('mongoose');

/** Na nova versão do mongoose temos que fazer essa tratação. 
 *  mongoose.set('useCreateIndex', true);
 *  mongoose.set('useFindAndModify', false);
 *  Caso contrario ficará acusando erro.
 */
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

/** nessa primeria variavel eu aponto o caminho do meu banco de dados Mongo.
 *  Assim fica mais fácil caso eu queira usa-la no resto da minha aplicação, 
 *  só chamar a variavel.
 */
let caminho = 'mongodb://localhost:27017/PortifolioBruno';

/** Mais uma atualização do mongoose, assim virá obrigado o uso do:
 * let urlParse = { useNewUrlParser: true }
 */
let urlParse = { useNewUrlParser: true }

/** E aqui é a conexão do MongoDB com a aplicação. */
mongoose.connect(caminho, urlParse);
if (mongoose.connect){
  mongoose.Promise = global.Promise;
  console.log('MongoDB já está no Ar.');
}
else{ 
  console.log('Deu pau!');
}

module.exports = mongoose;
    