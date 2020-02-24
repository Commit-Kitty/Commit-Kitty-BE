const { Router } = require('express');
const { ensureAuth, ensureAdminAuth } = require('../middleware/ensureAuth');
const Group = require('../models/Group');

module.exports = Router()

  .post('/', ensureAdminAuth, (req, res, next) => {
    Group 
      .create(req.body)
      .then(group => res.send(group))
      .catch(next);
  });
