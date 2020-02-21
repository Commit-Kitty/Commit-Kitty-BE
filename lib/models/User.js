const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
  userName: {
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
    unique: [true, 'Email is taken']
  },
  passwordHash: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.passwordHash;
    }
  }
});

schema.virtual('password').set(function(password) {
  this.passwordHash = bcrypt.hashSync(password, 4);
});

schema.static.findByToken = function(token) {
  try {
    const tokenPayload = jwt.verify(token, process.env.APP_SECRET);
    return Promise.resolve(this.hydrate({
      _id: tokenPayload._id,
      email: tokenPayload.email,
      __v: tokenPayload.__v
    }));
  } catch(err) {
    err.status = 400;
    return Promise.reject(err);
  }
};

schema.statics.authorize = async function({ email, password }) {
  const user = await this.findOne({ email });
  if(!user) {
    const err = new Error('Invalid Email/Passwor');
    err.status = 401;
    throw err;
  }

  const validpassword = await bcrypt.compare(password, user.passwordHash);
  if(!validpassword) {
    const err = new Error('Invalid Email/Passwor');
    err.status = 401;
    throw err;
  }
  return user;
};


module.exports = mongoose.model('User', schema);
