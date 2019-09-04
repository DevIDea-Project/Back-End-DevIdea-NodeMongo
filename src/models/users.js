const mongoose = require('../models/connectDb');
const bcrypt = require('bcryptjs');
/** Este require abaixo não vai ser mais necessario, pelo fato de logo em cima,
 *  eu importei o proprio banco que está dentro da pasta database e o arquivo dentro dele.
 */
//const mongoose = require('mongose');

const UserSchema = new mongoose.Schema({
  name: { type: String, require: true, },
  
  email: { type: String, unique: true, require: true, lowercase: true, },
  
  password: { type: String, require: true, select: false, },

  passwordResetToken: { type: String, select: false },

  passwordResetExpires: { type: Date, select: false},

  createdAt: { type: Date, dafault: Date.now, }
});

UserSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  
  next();
})

const User = mongoose.model('user', UserSchema);

module.exports = User;