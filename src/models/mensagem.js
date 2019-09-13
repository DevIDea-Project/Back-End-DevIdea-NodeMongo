const mongoose = require('../models/connectDb');

const MensagemSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
  },

  mensagem: {
     type: String,
     require: true,
  },
});

const Mensagem = mongoose.model('Mensagem', MensagemSchema);

module.exports = Mensagem;