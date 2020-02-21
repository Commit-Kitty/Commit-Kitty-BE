const { Router } = require('express');

module.exports = Router()
  .get('/callback', (req, res, next) => {
    console.log('Looks like we Made It!');
    res.send('We made it');
  });
  