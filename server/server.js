const express = require('express');
const app = express();
const config = require('./config/config');
const auth = require('./auth/routes');
const api = require('./api/api');

// Database setup
const mongoose = require('mongoose');

// Drop Testing Database
mongoose
  .connect('mongodb://127.0.0.1:27017/nmas-test', () => {
    mongoose.connection.db.dropDatabase();
});

// Connect to the database
mongoose
  .connect(config.db.url, () => {
    console.log(`Connected Database URL: ${config.db.url}`);
  });

require('./config/middlewares')(app);

// setup the api
app.use('/api', api);
app.use('/auth', auth);

// Global Error Handling
app.use(function(err, req, res, next) {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ error: 'Invalid token' });
    return;
  }
  return res.status(500).send({ error: 'Something went wrong.' });
});

module.exports = app;