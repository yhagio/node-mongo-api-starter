const User = require('./model');
const signToken = require('../../auth/auth').signToken;
const validatePassword = require('../../utils/helpers').validatePassword;
const validateEmail = require('../../utils/helpers').validateEmail;
const generatePassword = require('../../utils/helpers').generatePassword;

module.exports = {
  saveUser,
  getUser
}

// Register new user
function saveUser(req, res, next) {
  const username = req.body.username ? req.body.username.trim() : '';
  const email = req.body.email ? req.body.email.trim() : '';
  const password = req.body.password ? req.body.password.trim() : '';

  if (!username || !email || !password) {
    return res
      .status(422)
      .send({ error: 'Username, email, and password are required.' });
  }

  if (username.length > 30) {
    return res
      .status(400)
      .send({ error: 'Username must be less than 30 characters.' });
  }

  const emailValidationError = validateEmail(email);
  if (emailValidationError.length > 0) {
    return res
      .status(400)
      .send({ error: emailValidationError }); // array of errors
  }

  const passwordValidationError = validatePassword(password);
  if (passwordValidationError.length > 0) {
    return res
      .status(400)
      .send({ error: passwordValidationError });
  }

  // Check if email already exists
  User.findOne({ email: email}, function(err, existingUser) {
    if (err) return next(err);

    // if the email exists return error
    if (existingUser && existingUser.email.length > 0) {
      return res
        .status(422)
        .send({ error: 'The email is already registered.' });
    }

    // Create a new user object
    const newUser = new User({
      username: username,
      email: email,
      password: password
    });

    // Save the new user into the database
    newUser.save(function(err, userData) {
      if (err) return next(err);

      // Respond to request indicating that the user was created
      return res.json({
        token: signToken(userData.id),
        user: {
          id: userData._id,
          username: userData.username,
          email: userData.email
        }
      });
    });

  });
};

// Get one user
function getUser(req, res, next) {
  User.findById(req.params.id)
    .select('-password')
    .exec()
    .then((user) => {
      if (!user || user.email.length <= 0) {
        return next(new Error('No user with that id'));
      }
      return res.json(user)
    })
    .catch(err => next(err));
};