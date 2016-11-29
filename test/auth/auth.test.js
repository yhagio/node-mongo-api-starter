const app = require('../../server/server');
const request = require('supertest');
const expect = require('chai').expect;

describe('[Authentication] /auth Testing', () => {
  it('should be able to sign in with correct credentials', (done) => {
    request(app)
      .post('/api/users')
      .send({
        username: 'alice',
        email: 'alice@cc.cc',
        password:'Pass123!'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err1, res) => {
        request(app)
          .post('/auth/signin')
          .send({
            email: 'alice@cc.cc',
            password:'Pass123!'
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end((err2, resp) => {
            expect(resp.body).to.be.an('object');
            expect(resp.body).to.have.deep.property('user.username', 'alice');
            done();
          });
      });
  });

  it('should not be able to sign in if credentials are incorrect', (done) => {
    request(app)
      .post('/auth/signin')
      .send({
        email: 'alice@cc.cc',
        password:'BadPass123!'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.deep.property('error', 'Incorrect credentials');
        done();
      });
  });
});
