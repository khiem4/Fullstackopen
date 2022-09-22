import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [createBlogVisible, setCreateBlogVisible] = useState(false)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])


  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }


  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title: title,
      author: author,
      url: url,
      id: blogs.length + 1
    }

    await blogService.create(blog)
    setBlogs(blogs.concat(blog))
    setTitle('')
    setAuthor('')
    setUrl('')
    setSuccessMessage(`a new blog ${blog.title} by ${blog.author} added`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }


  const loginForm = () => (
    <div>
      <h2>log in to application</h2>

      <h2>
        {errorMessage}
      </h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          password
          <input
            type='text'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const blogList = () => {
    const hide = { display: createBlogVisible ? 'none' : '' }
    const show = { display: createBlogVisible ? '' : 'none' }

    return (
      <>
        <h2>blogs</h2>
        <h2>{successMessage}</h2>

        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
          />
        )}

        <h2>create new</h2>

        <div style={hide}>
          <button onClick={() => setCreateBlogVisible(true)}>create</button>
        </div>
        <div style={show}>
          <form onSubmit={handleCreateBlog}>
            <div>
              title
              <input
                type='text'
                value={title}
                name='title'
                onChange={({ target }) => setTitle(target.value)}
              />

              <div>
                author
                <input
                  type='text'
                  value={author}
                  name='author'
                  onChange={({ target }) => setAuthor(target.value)}
                />

              </div>
              url
              <input
                type='text'
                value={url}
                name='url'
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button>save</button>
          </form>
          <button onClick={() => setCreateBlogVisible(false)}>cancel</button>
        </div>
      </>
    )
  }

  return (
    <div>
      {
        user === null
          ? loginForm()
          : blogList()
      }
    </div>
  )
}

export default App
