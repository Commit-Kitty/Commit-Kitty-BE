const mongoose = require('mongoose');

const GroupDevsSchema = new mongoose.Schema({
  groupDevs: {
    type: mongoose.Types.ObjectId, 
    ref: 'Dev',
    required: true 
  }
});

const schema = new mongoose.Schema({
  groupName: {
    type: String, 
    required: true,
    unique: [true, 'Group name is taken']
  }, 
  groupDescription: {
    type: String
  },
  adminId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  devsInGroup: {
    type: [GroupDevsSchema],
    required: true, 
    validate: {
      validator: function(devsInGroup) {
        return devsInGroup.length > 0;
      },
      message: 'A group needs at least one dev in it to be valid.'
    }
  }

});


//STRETCH

module.exports = mongoose.model('Group', schema);

