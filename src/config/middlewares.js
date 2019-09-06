const bodyParser = require('body-parser');

/** Aqui fiz o uso do bodyparser justamente para auxiliar na requisições com os verbos
 * e retornar o body organizado.
 */
module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }))
}
