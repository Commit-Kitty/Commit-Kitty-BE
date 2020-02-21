require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can signup a user', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        userName: 'joel',
        email: 'joel@joel.com',
        password: '1234',
        role: 'Admin'
      })
      .then(res => {
        expect(res.header['set-cookie'][0]).toEqual(expect.stringContaining('session='));
        expect(res.body).toEqual({
          _id: expect.any(String),
          userName: 'joel',
          email: 'joel@joel.com',
          role: 'Admin',
          __v: 0
        });
      });
  });

  it('can login a user', async() => {
    const admin = await User.create({
      password: '1234',
      userName: 'Bobert',
      email: 'calvin@coolidge.com',
      role: 'Admin',
    });

    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'calvin@coolidge.com', password: '1234' })
      .then(res => {
        expect(res.body).toEqual({
          _id: admin.id,
          userName: 'Bobert',
          email: 'calvin@coolidge.com',
          role: 'Admin',
          __v: 0
        });
      });
  });
});
