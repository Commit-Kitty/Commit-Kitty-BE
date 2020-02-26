require('dotenv').config();
const { getDev, devAgent } = require('../lib/helpers/data-helpers');
const request = require('supertest');
const app = require('../lib/app');


describe('tests of dev model routes', () => {
  it('can create a dev with ensureAuth only (either Dev or Admin)', () => {
    return devAgent
      .post('/api/v1/dev/')
      .send({
        devName: 'great group',
        devGitHubHandle: '@githubHandle',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          devName: 'great group',
          devGitHubHandle: '@githubHandle',
          __v: 0
        });
      });
  });

  it('can get a dev by id with ensureAuth only (either Dev or Admin)', async() => {
    const dev = await getDev();

    return devAgent
      .get(`/api/v1/dev/${dev._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          devName: dev.devName,
          devGitHubHandle: dev.devGitHubHandle,
          __v: 0
        });
      });
  });

  it('can get a dev by the devName with ensureAuth only (either Dev or Admin)', async() => {
    const dev = await getDev({ devName: 'great dev name 0' });

    return devAgent
      .get(`/api/v1/dev/dev-name/${dev.devName}`)
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          devName: dev.devName,
          devGitHubHandle: dev.devGitHubHandle,
          __v: 0
        }]);
      });
  });

  it('can get a dev by the gitHubHandle with ensureAuth only (either Dev or Admin)', async() => {
    const dev = await getDev({ devGitHubHandle: '@devHandle0' });

    return devAgent
      .get(`/api/v1/dev/dev-handle/${dev.devGitHubHandle}`)
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          devName: dev.devName,
          devGitHubHandle: dev.devGitHubHandle,
          __v: 0
        }]);
      });
  });
  


});
