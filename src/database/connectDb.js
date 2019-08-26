const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

let caminho = 'mongodb://localhost:27017/PortifolioBruno';

mongoose.connect(caminho, {  useNewUrlParser: true });
if (mongoose.connect){
  mongoose.Promise = global.Promise;
  console.log('MongoDB já está no Ar.');
}
else{ 
  console.log('Deu pau!');
}


module.exports = mongoose;
    
