const { Router } = require('express');
const { ensureAdminAuth } = require('../middleware/ensureAuth');
const Group = require('../models/Group');

module.exports = Router()

  .post('/', ensureAdminAuth, (req, res, next) => {
    Group 
      .create(req.body)
      .then(group => res.send(group))
      .catch(next);
  })

  .get('/:id', ensureAdminAuth, (req, res, next) => {
    Group
      .findById(req.params.id)
      .then(group => res.send(group))
      .catch(next);
  });
