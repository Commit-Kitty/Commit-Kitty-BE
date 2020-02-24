require('dotenv').config();
const request = require('superagent');

module.exports = (code) => {
  return request.post(`https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`);
};
