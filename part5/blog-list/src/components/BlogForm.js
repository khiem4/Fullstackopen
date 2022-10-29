import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notificationMessage } from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()

    dispatch(createBlog({
      title,
      author,
      url
    }))
    setTitle('')
    setAuthor('')
    setUrl('')

    dispatch(notificationMessage(
      `a new blog ${title} by ${author} added`
    ))
    setTimeout(() => {
      dispatch(notificationMessage(null))
    }, 5000)
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="title"
          />
          <div>
            author
            <input
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
              placeholder="author"
            />
          </div>
          url
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="url"
          />
        </div>
        <button>save</button>
      </form>
    </div>
  )
}

export default BlogForm
