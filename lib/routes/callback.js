const { Router } = require('express');
const getAccessToken = require('../services/getAccessToken');

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
}

module.exports = Router()
  .get('/', async(req, res) => {
    const accessTokenData = await getAccessToken(req.query.code);
    const accessToken = pullOutAccessToken(accessTokenData.text);
    attachOAuthToken(res, accessToken);
    res.send(accessTokenData.text);
  });


