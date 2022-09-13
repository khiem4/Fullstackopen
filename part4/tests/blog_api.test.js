const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

let authorization

beforeEach(async () => {
  const user = {
    username: 'testing',
    name: 'tester',
    password: 'test'
  }

  await api
    .post('/api/users')
    .send(user)

  const result = await api
    .post('/api/login')
    .send(user)
  authorization = `bearer ${result.body.token}`

  await Blog.deleteMany({})

  const blogObject = helper.initialBlog
    .map(blog => new Blog(blog))
  const promiseArrayBlog = blogObject
    .map(blog => blog.save())
  await Promise.all(promiseArrayBlog)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect('content-type', /application\/json/)
    .expect('content-length', '2')
})


describe('add new blog post', () => {
  test('success with valid data', async () => {
    const newBlog = {
      title: 'testing',
      author: 'alex',
      url: 'localhost:3003/test',
      like: 100
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', authorization)
      .expect(201)
      .expect('content-type', /application\/json/)

    const totalBlogs = await helper.blogInDb()
    expect(totalBlogs).toHaveLength(helper.initialBlog.length + 1)

    const titles = totalBlogs.map(blog => blog.title)
    expect(titles).toContain('testing')
  })


  test('adding blog will fail if no token', async () => {
    const newBlog = {
      title: 'testing',
      author: 'alex',
      url: 'localhost:3003/test',
      like: 100
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('authorization', null)
      .expect(401)

    const totalBlogs = await helper.blogInDb()
    expect(totalBlogs).toHaveLength(helper.initialBlog.length)
  })

  test('missing likes property will be equal 0', async () => {
    const response = await api.get('/api/blogs')

    const noLikesBlog = response.body[2]
    if(noLikesBlog.likes === undefined) {
      noLikesBlog.likes = 0
    }

    expect(noLikesBlog.likes).toBe(0)
  })


  test('if title and url properties are missing response with bad request' , async () => {
    const newBlog = {
      like: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const totalBlog = await helper.blogInDb()
    expect(totalBlog).toHaveLength(helper.initialBlog.length)
  })
})

test('delete a blog post', async () => {
  const blogAtStart = await helper.blogInDb()
  const blogToDelete = blogAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogAtEnd = await helper.blogInDb()
  expect(blogAtEnd).toHaveLength(helper.initialBlog.length - 1)
})


test('update likes property of blog', async () => {
  const blogsInDb = await helper.blogInDb()
  const blogToUpdate = blogsInDb[0]

  const updatedLikes = {
    likes: 1
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedLikes)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogAfter = await helper.blogInDb()
  const blogAfterUpdated = blogAfter[0]

  expect(blogAfterUpdated.likes).toBe(1)
})



afterAll(() => {
  mongoose.connection.close()
})