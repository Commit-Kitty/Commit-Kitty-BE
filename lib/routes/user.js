const { Router } = require('express');
const { ensureAuth, ensureAdminAuth } = require('../middleware/ensureAuth');
const User = require('../models/User');

const MAX_IN_MS = 24 * 60 * 60 * 1000;

const setSessionCookie = (res, token) => {
  res.cookie('session', token, { 
    maxAge: MAX_IN_MS,
    httpOnly: true
  });
};

module.exports = Router()
  .post('/signup', (req, res, next) => {
    User
      .create(req.body)
      .then(user => {
        setSessionCookie(res, user.authToken());
        res.send(user);
      })
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    User
      .authorize(req.body)
      .then(user => {
        setSessionCookie(res, user.authToken());
        res.send(user);
      })
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res, next) => {
    res.send(req.user)
      .catch(next);
  })

  .post('/logout', (req, res) => {
    res.clearCookie('session', {
      maxAge: MAX_IN_MS
    });
    res.send(); 
  })

  .patch('/change-role/:id', ensureAdminAuth, (req, res, next) => {
    if(!req.body.role) {
      const err = new Error({
        message: 'Patch route is for changing the role only'
      });
      throw err;
    }
    User
      .findOneAndUpdate({ _id: req.params.id }, { role: req.body.role }, { new: true })
      .then(user => res.send(user))
      .catch(next);
  })

//ROUTE NOT TESTED!!!
  .get('/user-name/:userName', ensureAuth, (req, res, next) => {
    User
      .find({ userName: req.params.userName })
      .then(user => res.send(user))
      .catch(next);
  });
