const app = require('./app');

const port = 8080;

app.listen(process.env.PORT || port, function(){
  console.log('Servidor rodando na porta: ', port);
});
