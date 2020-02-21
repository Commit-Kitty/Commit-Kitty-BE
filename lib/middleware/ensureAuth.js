const User = require('../models/User');

const checkForToken = function(req) {
  const token = req.cookies.session;
  if(!token){
    const err = new Error('Login required.');
    err.status = 403;
    throw err;
  }
  return token;
};

const ensureRole = roles => (req, res, next) => {
  const token = checkForToken(req);
  User
    .findByToken(token)
    .then(user => {
      if(!roles.includes(user.role)) {
        const err = new Error(`User needs to be of ${roles}.`);
        err.status = 403;
        throw err;
      }
      req.user = user;
      next();
    })
    .catch(next);
};

const ensureAuth = ensureRole(['Dev', 'Admin']);
const ensureAdminAuth = ensureRole(['Admin']);

module.exports = {
  ensureAdminAuth, 
  ensureAuth
};
