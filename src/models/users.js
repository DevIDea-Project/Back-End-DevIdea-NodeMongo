const mongoose = require('../database');
//const mongoose = require('mongose');

const userSchema = new mongoose.Schema({
  name: { type: String, require: true, },
  
  email: { type: String, unique: true, require: true, lowercase: true, },
  
  password: { type: String, require: true, select: false, },

  createdAt: { type: Date, dafault: Date.now, }
});

const User = mongoose.model('user', userSchema);

module.exports = User;