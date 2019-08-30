const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

let caminho = 'mongodb://localhost:27017/PortifolioBruno';
let urlParse = { useNewUrlParser: true }


mongoose.connect(caminho, urlParse);
if (mongoose.connect){
  mongoose.Promise = global.Promise;
  console.log('MongoDB já está no Ar.');
}
else{ 
  console.log('Deu pau!');
}

module.exports = mongoose;
    