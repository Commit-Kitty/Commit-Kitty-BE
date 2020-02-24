const { Router } = require('express');
const { ensureAuth } = require('../middleware/ensureAuth');
const Dev = require('../models/Dev');

module.exports = Router()

  .post('/', ensureAuth, (req, res, next) => {
    Dev
      .create(req.body)
      .then(dev => res.send(dev))
      .catch(next);
  })
  
  .get('/:id', ensureAuth, (req, res, next) => {
    Dev
      .findById(req.params.id)
      .then(dev => res.send(dev))
      .catch(next);
  });