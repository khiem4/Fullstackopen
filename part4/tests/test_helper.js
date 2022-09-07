const Blog = require('../models/blog')

const initialBlog = [
  {
    id: '630e0dd9bc8a6f88ca11d8bc',
    title:'20 principles for developer',
    author: 'Ondrej Sevcik',
    url: 'https://dev.to/ondrejsevcik/20-principles-i-learned-from-10-years-of-developing-software-5354',
    likes: 128,
  },
  {
    id: '630e0e64bc8a6f88ca11d8c0',
    title: 'react isnt framework',
    author: 'cassaden',
    url: 'https://dev.to/cassaden/react-js-isnt-actually-a-web-framework-but-why-are-there-so-many-others-27fd',
    likes: 3,
  },
]


const blogInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlog,
  blogInDb
}