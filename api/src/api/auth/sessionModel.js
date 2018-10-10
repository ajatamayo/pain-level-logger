const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema(
  {
    clientId: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    userAgent: {
      type: String,
    },
    refreshToken: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      lowercase: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    ipAddress: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Session', sessionSchema);
