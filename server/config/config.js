const config = {
  dev: 'development',
  test: 'testing',
  prod: 'production',
  port: process.env.PORT || 3000,
  expireTime: '7d',
  secrets: {
    jwt: process.env.JWT || 'nmasAPI777badasswoohoo'
  }
}

// Setting environment variable (default 'development')
process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

let envConfig;
// Try-Catch for back up plan in case the correct
// file does not exist
try {
  envConfig = require('./' + config.env);
  // if no file, set it empty object to avoid failure
  envConfig = envConfig || {};
} catch(e) {
  envConfig = {};
}

// merge and or overwrite the two config files together
module.exports = Object.assign(config, envConfig);