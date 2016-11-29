const User = require('../api/user/model');

const userObjects = [
  { 
    username: 'alices',
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice@cc.cc',
    password: 'Pass123!',
  },
  { 
    username: 'bobs',
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob@cc.cc',
    password: 'Pass123!',
  },
  { 
    username: 'chriss',
    firstName: 'Chris',
    lastName: 'Smith',
    email: 'chris@cc.cc',
    password: 'Pass123!',
  }
];

if (process.env.NODE_ENV === 'development' || 
    process.env.NODE_ENV  === 'testing') {
  User.count({}, (err, count) => {
    if (count < 1) {
      userObjects.forEach((r) => {
        const newUser = new User({
          username: r.username,
          firstName: r.firstName,
          lastName: r.lastName,
          email: r.email,
          password: r.password
        });
        newUser.save();
      });
      console.log('User Seed Done');
    }
  });
}
