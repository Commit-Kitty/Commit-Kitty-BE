require('dotenv').config();
const { getUser, devAgent, adminAgent } = require('../lib/helpers/data-helpers');
const request = require('supertest');
const app = require('../lib/app');

describe('tests of user model routes', () => {
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
    const user = await getUser(); 
    // eslint-disable-next-line no-console
    console.log('expecting Admin role because admins are seeded first in seed.js');
    
    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: user.email, password: 'password' })
      .then(res => {
        expect(res.body).toEqual({
          _id: user._id,
          userName: user.userName,
          email: user.email,
          role: 'Admin',
          __v: 0
        });
      });
  });

  it('fails to login a user with a bad email', async() => {
    await getUser();
    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'badEmail@notgood.io', password: 'password' })
      .then(res => {
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({
          status: 401,
          message: 'Invalid Email or Password'
        });
      });
  });
  
  it('fails to login a user with a bad password', async() => {
    await getUser();
    return request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'user@tess.com', password: 'notright' })
      .then(res => {
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({
          status: 401,
          message: 'Invalid Email or Password'
        });
      });
  });

  it('can verify a logged in user', async() => {
    const user = await getUser({ email: 'dev0@tess.com' });
    return devAgent
      .get('/api/v1/auth/verify')
      .then(res => {        
        expect(res.body).toEqual({
          _id: expect.any(String),
          userName: user.userName,
          email: user.email,
          role: 'Dev',
          __v: 0
        });
      });
  });

  it('should log out a user', async() => {
    return await devAgent
      .post('/api/v1/auth/logout')
      .then(res => {
        expect(res.header['set-cookie'][0]).toEqual(expect.stringContaining('session=;'));
      });
  });

  it('via admin role only, can patch a dev user such that the role of the dev is updated to admin', async() => {
    const userToChangeRole = await getUser({ role: 'Dev' });
    return adminAgent
      .patch(`/api/v1/auth/change-role/${userToChangeRole._id}`)
      .send({ role: 'Admin' })
      .then(res => {
        expect(res.body).toEqual({
          _id: userToChangeRole._id.toString(),
          userName: userToChangeRole.userName,
          email: userToChangeRole.email,
          role: 'Admin',
          __v: 0
        });
      });
  });

});
