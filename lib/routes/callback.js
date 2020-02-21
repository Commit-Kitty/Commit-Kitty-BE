const { Router } = require('express');
const getAccessToken = require('../services/getAccessToken');
const {
  attachOAuthToken,
  pullOutAccessToken
} = require('./callbackUtils');

module.exports = Router()
  .get('/', async(req, res) => {
    const accessTokenData = await getAccessToken(req.query.code);
    const accessToken = pullOutAccessToken(accessTokenData.text);
    attachOAuthToken(res, accessToken);
    res.send(accessTokenData.text);
  });

