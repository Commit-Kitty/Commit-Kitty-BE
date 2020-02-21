const { Router } = require('express');

module.exports = Router()
  .get('/', (req, res) => {
    console.log('We here');
    res.send('We made it!');
  });

