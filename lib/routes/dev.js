const { Router } = require('express');
const { ensureAuth, ensureAdminAuth } = require('../middleware/ensureAuth');
const Dev = require('../models/Dev');

module.exports = Router()

  .post('/', ensureAuth, (req, res, next) => {
    Dev
      .create(req.body)
      .then(dev => res.send(dev))
      .catch(next);
  });
