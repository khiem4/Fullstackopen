const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')


test('invalid users is not created', async () => {
  const user = {
    username: 'kh',
    name: 'khiem',
    password: '123'
  }

  await api
    .post('/api/users')
    .send(user)
    .expect(400)


  const userAtEnd = await User.find({})
  expect(userAtEnd).toHaveLength(userAtEnd.length)
})


afterAll(() => {
  mongoose.connection.close()
})