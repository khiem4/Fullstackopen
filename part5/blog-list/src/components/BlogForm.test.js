import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
  test('check event handle of blog form', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    render(<BlogForm handleCreateBlog={createBlog} />)

    const title = screen.getByPlaceholderText('title')
    const url = screen.getByPlaceholderText('url')
    const author = screen.getByPlaceholderText('author')
    const saveButton = screen.getByText('save')

    await user.type(title, 'React pattern...')
    await user.type(author, 'alex')
    await user.type(url, 'fullstackopen.com/en')
    await user.click(saveButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('React pattern...')
    expect(createBlog.mock.calls[0][0].author).toBe('alex')
    expect(createBlog.mock.calls[0][0].url).toBe('fullstackopen.com/en')
  })
})
