const attachOAuthToken = (res, token) => {
  res.cookie('oauth-token', token, {
    maxAge: 24 * 60 * 60 * 1000
  });
};

const pullOutAccessToken = (accessTokenData) => {
  const firstPass = accessTokenData.split('=');
  const secondItem = firstPass[1];
  const secondPass = secondItem.split('&');
  return secondPass[0];
};

module.exports = {
  attachOAuthToken,
  pullOutAccessToken
};
