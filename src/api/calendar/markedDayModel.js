const mongoose = require('mongoose');

const markedDaySchema = mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      email: {
        type: String,
        required: true,
        index: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('markedDay', markedDaySchema);
