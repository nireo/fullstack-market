const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('Main route works and returns json', async () => {
  await api
    .get('/api/main')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('Creating post without token returns error', async () => {
  const post = {
    title: 'test',
    description: 'test',
    price: 1,
    content: 'content'
  };

  await api
    .post('/api/post')
    .send(post)
    .expect(401);
});

afterAll(() => {
  mongoose.connection.close();
});
