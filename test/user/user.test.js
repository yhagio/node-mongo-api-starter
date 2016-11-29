const app = require('../../server/server');
const request = require('supertest');
const expect = require('chai').expect;

describe('[USER] /api/users Testing', () => {

  it('should be able to sign up a new user', (done) => {
    request(app)
      .post('/api/users')
      .send({
        username: 'mufasa',
        email: 'mufasa@cc.cc',
        password:'Pass123!'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.deep.property('user.email', 'mufasa@cc.cc');
        done();
      })
  });

  it('should not be able to sign up if any inputs are empty', (done) => {
    request(app)
      .post('/api/users')
      .send({
        username: '',
        email: 'olala@cc.cc',
        password:'Pass123!'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.deep.property('error', 'Username, email, and password are required.');
        done();
      })
  });

  it('should not be able to sign up a user with same email', (done) => {
    request(app)
      .post('/api/users')
      .send({
        username: 'kevin',
        email: 'mufasa@cc.cc',
        password:'Pass123!'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.deep.property('error', 'The email is already registered.');
        done();
      })
  });

  // it('should be able to get a specific user', (done) => {
  //   request(app)
  //     .post('/api/users')
  //     .send({
  //       username: 'ali',
  //       email: 'ali@cc.cc',
  //       password:'alialiali'
  //     })
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(201)
  //     .end((err, res) => {
        
  //       request(app)
  //         .get(`/api/users/${res.body.user.id}`)
  //         .set('Accept', 'application/json')
  //         .expect('Content-Type', /json/)
  //         .expect(201)
  //         .end((error, resp) => {
  //           expect(res.body).to.have.deep.property('user.email', 'ali@cc.cc');
  //           done();
  //         });
        
  //     });
  // });
})