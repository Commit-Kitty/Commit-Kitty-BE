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
  //STRETCHES: add ranking field, add a reference to the User model
});

module.exports = mongoose.model('Dev', schema);
