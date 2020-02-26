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
  })

  //STRETCH: if we change the Dev model to reference any other models then we will need to .populate the reference field
  .get('/dev-name/:devName', ensureAuth, (req, res, next) => {
    Dev
      .find({ devName: req.params.devName })
      .then(dev => res.send(dev))
      .catch(next);
  })
  
  .get('/dev-handle/:devGitHubHandle', ensureAuth, (req, res, next) => {
    Dev
      .find({ devGitHubHandle: req.params.devGitHubHandle })
      .then(dev => res.send(dev))
      .catch(next);
  });
