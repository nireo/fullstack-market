const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('User route works and returns json', async () => {
  await api
    .get('/api/user')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('Login route works', async (done) => {
  await post
    .post('/api/login')
    .expect('Content-Type', /application\/json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body.token).toBeDefined();
      expect(res.body.user).toBeDefined();
      done();
    })
});

test('User creation works', async (done) => {
  const userObject = {
    username: 'test1',
    password: 'salasana',
    email: 'test@test.fi'
  };
  await api
    .post('/api/user')
    .send(userObject)
    .expect('Content-Type', /application\/json/)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      expect(res.body.username).toBe(userObject.username);
      expect(res.body.email).toBe(userObject.email);
      expect(res.body._id).toBeDefined();
      done();
    });
});

afterAll(() => {
  mongoose.connection.close();
});
