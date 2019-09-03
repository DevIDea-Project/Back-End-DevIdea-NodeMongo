//const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars')

const { host, port, user, pass } = require('../config/mail.json');

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass },
});

const handlebarOptions = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: 'some/path',
    layoutsDir: 'some/path',
    defaultLayout: 'email.body.hbs',
  },
  viewPath: 'some/path',
  extName: '.hbs',
};

transport.use('compile', hbs(handlebarOptions));

/*transport.use('compile', hbs({
  viewEngine:'handlebars',
  viewPath: path.resolve('./src/resources/mail/'),
  extName: '.html',
}));*/


module.exports = transport;