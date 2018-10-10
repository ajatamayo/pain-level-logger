const mongoose = require('mongoose');
const config = require('../../config');

const { refreshTokenLife } = config.jwt;

const clientSchema = mongoose.Schema(
  {
    clientId: {
      type: String,
      required: true,
      index: true,
    },
    user: {
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
      expires: refreshTokenLife,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Client', clientSchema);
