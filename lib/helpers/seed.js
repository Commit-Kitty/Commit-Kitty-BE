const chance = require('chance').Chance();

const User = require('../models/User');

module.exports = async({ numUsers = 2 } = {}) => {
  const devs = await User.create([...Array(numUsers)].map((_, i) => ({
    userName: 'cool dev',
    email: `dev${i}@tess.com`, 
    password: 'password', 
    role: 'Dev'
  })));

  const admins = await User.create([...Array(numUsers)].map((_, i) => ({
    userName: 'cool admin',
    email: `admin${i}@tess.com`, 
    password: 'password', 
    role: 'Admin'
  })));

};
