const app = require('./server/server');
const config = require('./server/config/config');

// const Restaurant = require('./server/api/restaurant/restaurantModel');

require('./server/utils/seeds');
  
app.listen(config.port, () => {
  console.log(`Connected to http://localhost:${config.port}`);
});