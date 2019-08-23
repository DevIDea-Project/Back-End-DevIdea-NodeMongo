const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

let caminho = 'mongodb://localhost:27017/PortifolioBruno';

mongoose.connect(caminho, {  useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;
    
