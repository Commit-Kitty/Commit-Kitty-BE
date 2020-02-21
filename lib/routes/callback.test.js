const { pullOutAccessToken } = require('./callbackUtils');

describe('OAUTH ROUTES and FUNCTIONS', () => {
  it('can pull out the access token', () => {
    const accessTokenText = 'access_token=83527421c4086097ea1985a323414a8cd69192c8&scope=repo&token_type=bearer';

    expect(pullOutAccessToken(accessTokenText)).toEqual('83527421c4086097ea1985a323414a8cd69192c8');
  });
});
