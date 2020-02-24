const { Router } = require('express');
const { ensureAuth, ensureAdminAuth } = require('../middleware/ensureAuth');
const Group = require('../models/Group');

module.exports = Router()

  .post('/', ensureAdminAuth, (req, res, next) => {
    Group 
    ///or is this a .update?
      .create(req.body)
      .then(group => res.send(group))
      .catch(next);
  });
