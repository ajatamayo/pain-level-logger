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
    value: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('markedDay', markedDaySchema);
