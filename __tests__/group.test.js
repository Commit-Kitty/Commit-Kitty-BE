require('dotenv').config();
const { getGroup, getUser, getDev, adminAgent } = require('../lib/helpers/data-helpers');
const request = require('supertest');
const app = require('../lib/app');


describe('tests of group model routes', () => {
  it('can create a group with admin access only ', async () => {
    const admin = await getUser({ email: 'admin0@tess.com' });
    const dev1 = await getDev({ devGitHubHandle: '@devHandle0' });
    const dev2 = await getDev({ devGitHubHandle: '@devHandle1' });

    return adminAgent
      .post('/api/v1/group/')
      .send({
        groupName: 'great group',
        adminIds: [admin._id],
        devsInGroup: [dev1._id, dev2._id]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          timeStamp: expect.any(String),
          groupName: 'great group',
          adminIds: [admin._id.toString()],
          devsInGroup: [dev1._id, dev2._id],
          __v: 0
        });
      });
  });

  it('can get a group by id with ensureAdminAuth', async () => {
    const admin = await getUser({ email: 'admin0@tess.com' });
    const group = await getGroup({ groupName: 'groupName0' });

    return adminAgent
      .get(`/api/v1/group/${group._id}`)
      .send({
        groupName: group.groupName,
        adminIds: [admin._id],
        devsInGroup: [group.devsInGroup[0]._id, group.devsInGroup[1]._id]
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          timeStamp: expect.any(String),
          groupName: group.groupName,
          adminIds: [admin._id.toString()],
          devsInGroup: expect.any(Array),
          __v: 0
        });
      });
  });

  it('via admin role only, can patch a group such that a Dev is added to devsInGroup', async () => {
    const devToAddToGroup = await getDev({ devGitHubHandle: '@devHandle3' });
    const admin = await getUser({ email: 'admin0@tess.com' });
    const group = await getGroup({ groupName: 'groupName0' });

    return adminAgent
      .patch(`/api/v1/group/add-dev/${group._id}`)
      .send({ devsInGroup: devToAddToGroup._id })
      .then(res => {
        expect(res.body).toEqual({
          _id: group._id.toString(),
          groupName: group.groupName,
          timeStamp: expect.any(String),
          adminIds: [admin._id.toString()],
          devsInGroup: [group.devsInGroup[0], group.devsInGroup[1], devToAddToGroup._id],
          __v: 0
        });
      });
  });

  it('via admin role only, can .put a group such that a Dev is removed from devsInGroup', async () => {
    const devToRemove = await getDev({ devGitHubHandle: '@devHandle1' });
    const admin = await getUser({ email: 'admin0@tess.com' });
    const group = await getGroup({ groupName: 'groupName0' });

    return adminAgent
      .put(`/api/v1/group/remove-dev/${group._id}`)
      .send({ devsInGroup: devToRemove._id })
      .then(res => {
        expect(res.body).toEqual({
          _id: group._id.toString(),
          groupName: group.groupName,
          timeStamp: expect.any(String),
          adminIds: [admin._id.toString()],
          devsInGroup: [group.devsInGroup[0]],
          __v: 0
        });
      });
  });

  it('via admin role only, can get a group by Admin id', async () => {
    const notOurTestAdmin = await getUser({ email: 'admin1@tess.com' });
    const admin = await getUser({ email: 'admin0@tess.com' });

    const groupWithOurAdmin = await getGroup({ adminIds: [admin._id] });
    const allGroups = [groupWithOurAdmin, await getGroup({ adminIds: [notOurTestAdmin._id] })];

    return adminAgent
      .get(`/api/v1/group/groups-by-admin/${admin._id}`)
      .then(res => {
        allGroups.forEach(group => {
          if (group.adminIds.includes(admin._id)) {
            expect(res.body).toEqual([{
              _id: group._id.toString(),
              groupName: group.groupName,
              timeStamp: expect.any(String),
              adminIds: [admin._id.toString()],
              devsInGroup: [
                {
                  __v: 0,
                  _id: expect.any(String),
                  devGitHubHandle: '@devHandle0',
                  devName: 'great dev name 0'
                },
                {
                  __v: 0,
                  _id: expect.any(String),
                  devGitHubHandle: '@devHandle1',
                  devName: 'great dev name 1',

                }
              ],
              __v: 0
            }]);
          }

        });
      });
  });


});
