const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  devName: {
    type: String, 
    required: true
  }, 
  devGitHubHandle: {
    type: String, 
    required: true
  }
});

module.exports = mongoose.model('Dev', schema);
