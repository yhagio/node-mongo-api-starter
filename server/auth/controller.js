const User = require('../api/user/model');
const signToken = require('./auth').signToken;

module.exports = {
  signin
}

function signin(req, res, next) {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume

  const token = signToken(req.user._id);
  return res.json({
    token: token,
    user: {
      username: req.user.username,
      email: req.user.email
    }
  });
};