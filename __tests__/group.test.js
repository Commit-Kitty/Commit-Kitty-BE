require('dotenv').config();
const { getGroup, getUser, getDevs, adminAgent } = require('../lib/helpers/data-helpers');
const request = require('supertest');
const app = require('../lib/app');


describe('tests of group model routes', () => {
  it('can create a group with admin access only ', async() => {
    const admin = await getUser({ email: 'admin0@tess.com' });
    const devs = await getDevs();

    return adminAgent
      .post('/api/v1/group/')
      .send({
        groupName: 'great group',
        adminId: admin._id,
        devsInGroup: [devs[0]._id, devs[1]._id]
      })
      .then(res => {
        expect(res.header['set-cookie'][0]).toEqual(expect.stringContaining('session='));
        expect(res.body).toEqual({
          _id: expect.any(String),
          groupName: 'great group',
          adminId: admin._id.toString(),
          devsInGroup: [devs[0]._id.toString(), devs[1]._id.toString()],
          __v: 0
        });
      });
  });
  


});
