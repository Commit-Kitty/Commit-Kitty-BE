// const chance = require('chance').Chance();

const User = require('../models/User');
const Dev = require('../models/Dev');
const Group = require('../models/Group');

module.exports = async({ numUsers = 2, numDevs = 5, numGroups = 2 } = {}) => {
  
  const userAdmins = await User.create([...Array(numUsers)].map((_, i) => ({
    userName: 'cool admin',
    email: `admin${i}@tess.com`, 
    password: 'password', 
    role: 'Admin'
  })));
  
  const userDevs = await User.create([...Array(numUsers)].map((_, i) => ({
    userName: 'cool user dev',
    email: `dev${i}@tess.com`, 
    password: 'password', 
    role: 'Dev'
  })));

  const devs = await Dev.create([...Array(numDevs)].map((_, i) => ({
    devName: `great dev name ${i}`,
    devGitHubHandle: `@devHandle${i}`, 
  })));

  const groups = await Group.create([...Array(numGroups)].map((_, i) => ({
    groupName: `groupName${i}`,
    adminIds: [userAdmins[i]._id], 
    devsInGroup: [devs[0]._id, devs[1]._id]
  })));
  
};
