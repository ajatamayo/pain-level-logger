const mongoose = require('mongoose');
const validator = require('validator');

const loginCodeSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    index: true,
    lowercase: true,
    validate: [validator.isEmail, 'invalid email address'],
  },
  encryptedCode: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('LoginCode', loginCodeSchema);
