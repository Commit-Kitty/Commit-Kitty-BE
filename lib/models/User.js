const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['Admin', 'Dev']
  },
  email: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('User', schema);
