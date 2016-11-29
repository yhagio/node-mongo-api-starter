// Production database (MongoLab in this case)
module.exports = {
  db: {
    url: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nmas-dev'
  }
};