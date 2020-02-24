const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  groupName: {
    type: String, 
    required: true
  }, 
  groupDescription: {
    type: String
  },
  adminIds: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    }], 
    required: true,
    validate: {
      validator: function(adminIds) {
        return adminIds.length > 0;
      },
      message: 'A group needs at least one admin for it to be valid.'
    }
  },
  devsInGroup: {
    type: [{
      type: mongoose.Types.ObjectId, 
      ref: 'Dev',
      required: true 
    }],
    required: true, 
    validate: {
      validator: function(devsInGroup) {
        return devsInGroup.length > 0;
      },
      message: 'A group needs at least one dev in it to be valid.'
    }
  }

});

module.exports = mongoose.model('Group', schema);
