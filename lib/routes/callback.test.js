const { pullOutAccessToken } = require('./callbackUtils');

describe('OAUTH ROUTES and FUNCTIONS', () => {
  it('can pull out the access token', () => {
    const accessTokenText = 'access_token=thisisnotarealaccesstoken&scope=repo&token_type=bearer';

    expect(pullOutAccessToken(accessTokenText)).toEqual('thisisnotarealaccesstoken');
  });
});
