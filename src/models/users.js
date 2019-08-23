const mongoose = require('../database/connectDb');
const bcrypt = require('bcryptjs');
//const mongoose = require('mongose');

const UserSchema = new mongoose.Schema({
  name: { type: String, require: true, },
  
  email: { type: String, unique: true, require: true, lowercase: true, },
  
  password: { type: String, require: true, select: false, },

  createdAt: { type: Date, dafault: Date.now, }
});

UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  
  next();
})

const User = mongoose.model('user', UserSchema);

module.exports = User;