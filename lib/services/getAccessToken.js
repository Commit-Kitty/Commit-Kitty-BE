const request = require('superagent');

module.exports = (code) => {
  return request.post(`https://github.com/login/oauth/access_token?client_id=c715bf39a4242ffcd1b9&client_secret=6ce67c9828ddd5666ddbb7163f995ae587f9d696&code=${code}`);
};
