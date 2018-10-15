const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
  pk: {
    type: Number,
    index: true,
  },
  longUrl: String,
  createdAt: Date,
});

module.exports = mongoose.model('Url', urlSchema);
