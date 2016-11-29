const Router = require('express').Router();
const verifyUser = require('./auth').verifyUser;
const controller = require('./controller');
// const decodeToken = require('./auth').decodeToken;

// Before we send back JWT, let's check if
// user's email and password match what we have in the database
Router.post('/signin', verifyUser(), controller.signin);

// Get user data for signed-in user
// Router.get('/userdata', decodeToken(), controller.getSignedInUserData);

module.exports = Router;