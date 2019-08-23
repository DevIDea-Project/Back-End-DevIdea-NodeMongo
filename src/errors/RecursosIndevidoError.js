/** Implementando erro e exportando para usar no resto da aplicação.*/
module.exports = function RecursosIndevidoError(message = 'Este recurso não pertence ao usuario') {
  this.name = 'RecursosIndevidoError';
  this.message = message;
};
