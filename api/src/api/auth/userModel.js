const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'invalid email address'],
  },
  displayName: {
    type: String,
    trim: true,
  },
  scopes: {
    type: [{
      type: String,
      enum: [
        'user',
        'admin',
      ],
    }],
    default: 'user',
  },
  activeTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
