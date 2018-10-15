const mongoose = require('mongoose');
const { initialPk } = require('./base58');

const counterSchema = mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    default: initialPk,
  },
});

module.exports = mongoose.model('counter', counterSchema);
