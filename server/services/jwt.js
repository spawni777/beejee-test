const jwt = require('jsonwebtoken');
const {jwtSecretKey} = require('../keys/keys');

function generateJwt(payload) {
  return jwt.sign(payload, jwtSecretKey);
}

function verifyJwt(token) {
  return jwt.verify(token, jwtSecretKey);
}

module.exports = {
  generateJwt,
  verifyJwt,
};
