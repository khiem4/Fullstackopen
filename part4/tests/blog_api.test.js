const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect('content-type', /application\/json/)
    .expect('content-length', '2')
})


afterAll(() => {
  mongoose.connection.close()
})