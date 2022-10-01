import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

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

  test('blog url and likes show up when click button', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const div = component.container.querySelector('.blog')

    expect(viewButton).toBeTruthy()
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(blog.likes)
  })
})