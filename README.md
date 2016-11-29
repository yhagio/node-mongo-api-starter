### Node.js / Express / MongoDB (Mongoose) starter kit

I created this simple starter kit 
to get started working on simple Node.js API project quickly

* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](http://mongoosejs.com/index.html)
* [JSON Web Token](https://jwt.io/)

**Hosting**

* [Heroku](https://www.heroku.com/)
* [MongoLab](https://mlab.com/)

**Testing**

* [Mocha](https://mochajs.org/)
* [Chai](http://chaijs.com/)
* [Supertest](https://github.com/visionmedia/supertest)


### Features

* [X] Linting (Airbnb)
* [X] Authentication with JSON Web Token
* [X] Username, Email, Password validations 
* [X] User signup, signin
* [X] API and Unit testing
* [X] Easily deployable to Heroku (Procfile)
* [X] Travis yml included

### To run locally

Make sure to install and run MongoDb first.
```
brew update
brew install mongodb
mongod 
```

Clone the repo and run the app
```
git clone git@github.com:yhagio/node-mongo-api-starter.git nd
cd nd
npm i 
npm run start
```

### To run test
```
mongod
```

```
npm run test
```

To show coverage
```
npm run coverage
```

### To deploy on Heroku
```
heroku login
heroku create
git push heroku master
```