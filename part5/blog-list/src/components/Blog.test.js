import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

let component

describe('<Blog />', () => {
  const handleBlogLikes = jest.fn()
  const handleDeleteBlog = jest.fn()

  const blog = {
    title: 'Tips to learning react',
    author: 'alex',
    likes: 12,
    url: 'https://fullstackopen.com/en/',
    user: 'khiem'
  }

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        handleBlogLikes={handleBlogLikes}
        handleDeleteBlog={handleDeleteBlog}
      />
    )

  })
  test('render title and author', () => {
    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
  })
})