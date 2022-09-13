const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id:1 } )
  response.json(blogs)
})


blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if(blog) {
    return response.json(blog)
  }
  response.status(404).end()
})


blogRouter.post('/',userExtractor ,async (request, response) => {
  const body = request.body
  const user = request.user
  console.log('user:', user.id)

  const blog = new Blog({
    ...body,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})


blogRouter.delete('/:id' , userExtractor, async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  const user = request.user

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(id)
    return response.status(204).end()
  }
  if(!request.token) {
    return response.status(403).json({ error: 'you need to login first' })
  }

  response.status(403).json({
    error:'this user do not have permission to delete the file'
  })
})


blogRouter.put('/:id', async (request, response) => {
  const { likes } = request.body

  const updatedNote = await Blog
    .findByIdAndUpdate(request.params.id, { likes } ,{ new: true })
  response.json(updatedNote)
})



module.exports = blogRouter