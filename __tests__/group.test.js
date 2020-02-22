require('dotenv').config();
const { getGroup, getDevs, devAgent, adminAgent } = require('../lib/helpers/data-helpers');
const request = require('supertest');
const app = require('../lib/app');


describe('tests of group model routes', () => {
  it('can create a group with admin access only ', async() => {
    const devs = await getDevs();

    return request(app)
      .post('/api/v1/group/')
      .send({
        groupName: 'great group',
        adminId: '1234',
        devsInGroup: [devs[0]._id, devs[1]._id]
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

  


});
