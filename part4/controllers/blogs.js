const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', {
      username: 1, name: 1, id: 1,
    })
    .populate('comments', {
      comment: 1, id: 1,
    })
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate('user', {
      username: 1, name: 1, id: 1,
    })
    .populate('comments', {
      comment: 1, id: 1,
    })

  if (blog) {
    return response.json(blog)
  }
  response.status(404).end()
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    ...body,
    user: user._id,
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.post('/:id/comments', async (request, response) => {
  const { id } = request.params
  const { comment } = request.body
  const blog = await Blog.findById(id)
    .populate('user', {
      username: 1, name: 1, id: 1,
    })
    .populate('comments', {
      comment: 1, id: 1,
    })

  const newComment = new Comment({
    comment,
    blog: blog._id
  })

  const savedComment = await newComment.save()
  blog.comments = blog.comments.concat(savedComment)
  const updateBlog = await blog.save()

  updateBlog
    ? response.status(201).json(updateBlog)
    : response.status(404).end()
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const { likes } = request.body

  const updatedLikes = await Blog.findByIdAndUpdate(
    id,
    { likes },
    { new: true }
  ).populate('comments', {
    comment: 1,
    id: 1,
  })

  response.json(updatedLikes)
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const user = request.user
  const blog = await Blog.findById(id)

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(id)
    return response.status(204).end()
  }
  if (!request.token) {
    return response.status(403).json({
      error: 'you need to login first',
    })
  }

  response.status(403).json({
    error: 'this user do not have permission to delete the file',
  })
})


module.exports = blogRouter
