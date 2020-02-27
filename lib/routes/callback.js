const { Router } = require('express');
const getAccessToken = require('../services/getAccessToken');
const {
  attachOAuthToken,
  pullOutAccessToken
} = require('./callbackUtils');

module.exports = Router()
  .get('/', (req, res) => {
    return getAccessToken(req.query.code)
      .then(accessTokenData => pullOutAccessToken(accessTokenData.text))
      .then(accessToken => attachOAuthToken(res, accessToken))
      .then(() => res.redirect(`${process.env.MONGODB_URI}`));
  });

