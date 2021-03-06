require('dotenv').config();
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const seed = require('./seed');
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Dev = require('../models/Dev');
const Group = require('../models/Group');

beforeAll(() => {
  connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return seed({ numUsers: 2, numDevs: 5, numGroups: 2 });
});

const devAgent = request.agent(app);
const adminAgent = request.agent(app);

beforeEach(async() => {
  await devAgent
    .post('/api/v1/auth/login')
    .send({ userName: 'CedarDev', email: 'dev0@tess.com', password: 'password' });
  await adminAgent
    .post('/api/v1/auth/login')
    .send({ userName: 'CedarAdmin', email: 'admin0@tess.com', password: 'password' });
});

afterAll(() => {
  return mongoose.connection.close();
});

const prepare = doc => JSON.parse(JSON.stringify(doc));
const createGetters = Model => {
  const modelName = Model.modelName;
  return {
    [`get${modelName}`]: (query) => Model.findOne(query).then(prepare),
    [`get${modelName}s`]: (query) => Model.find(query).then(docs => docs.map(prepare))
  };
};
module.exports = {
  ...createGetters(Dev),
  ...createGetters(Group),
  ...createGetters(User),
  devAgent, 
  adminAgent
};
