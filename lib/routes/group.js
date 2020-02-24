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
  })

  .patch('/add-dev/:id', ensureAdminAuth, (req, res, next) => {
    if(!req.body.devsInGroup) {
      const err = new Error({
        message: 'route for adding a Dev only'
      });
      throw err;
    }
    Group
      .findByIdAndUpdate({ _id: req.params.id }, { $push: { devsInGroup: req.body.devsInGroup } }, { new: true })
      .then(group => res.send(group))
      .catch(next);
  })
  
  .put('/remove-dev/:id', ensureAdminAuth, (req, res, next) => {
    if(!req.body.devsInGroup) {
      const err = new Error({
        message: 'route for removing a Dev only'
      });
      throw err;
    }
    Group
      .findByIdAndUpdate({ _id: req.params.id }, { $pull: { devsInGroup: req.body.devsInGroup } }, { new: true })
      .then(group => res.send(group))
      .catch(next);
  });

//use a .find method to find all groups by Admin--> same thing for finding all groups by dev
// .populate('devsInGroup')
