/** Importação dos modulos que irei usar. */
const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

/** Esta parte é interessante, apenas coloco dentro de uma apenas chamada.
 *  Passando: host, port, user e pass que será usado pelo mailer.
 */
const { host, port, user, pass } = require('../config/mail.json');

/** Aqui uso o mailer */
const transport = nodemailer.createTransport({
  host,
  port,
  auth: { 
    user, pass 
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: '.html',
    partialsDir: path.resolve('./src/view/resources/mail/'),
    layoutsDir: path.resolve('./src/view/resources/mail/'),
    defaultLayout: '',
  },
  viewPath: path.resolve('./src/view/resources/mail/'),
  extName: '.html',
}
transport.use('compile', hbs(handlebarOptions))

module.exports = transport;
