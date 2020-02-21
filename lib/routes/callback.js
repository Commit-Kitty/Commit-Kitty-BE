const { Router } = require('express');
const getAccessToken = require('../services/getAccessToken');

module.exports = Router()
  .get('/', async(req, res) => {
    const aT = await getAccessToken(req.query.code);
    console.log(aT.text);
    res.send(aT.text);
  });

  //take that accesstoken and attach to my headers

