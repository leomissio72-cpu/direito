// backend/models/Image.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  originalName: String,
  filename: String,
  path: String,
  processId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Process',
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Image', imageSchema);
