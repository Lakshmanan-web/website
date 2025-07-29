const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  picture: String,
  googleId: { type: String, unique: true, sparse: true },
  isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema); 