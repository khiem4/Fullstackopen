import { useState, useEffect } from 'react'
import Blogs from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { createBlog, initialBlogs, likedBlogUpdate } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { notificationMessage } from './reducers/notificationReducer'


const App = () => {
  const dispatch = useDispatch()
  const blogState = useSelector(state => state.blog)
  const notification = useSelector(state => state.notification)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initialBlogs())
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(notificationMessage(`${user} login`))
      setTimeout(() => {
        dispatch(notificationMessage(null))
      }, 5000)

    } catch (err) {
      dispatch(notificationMessage('Wrong username or password'))
      setTimeout(() => {
        dispatch(notificationMessage(null))
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleCreateBlog = async (blog) => {
    dispatch(createBlog(blog))

    dispatch(notificationMessage(
      `a new blog ${blog.title} by ${blog.author} added`
    ))
    setTimeout(() => {
      dispatch(notificationMessage(null))
    }, 5000)
  }

  const blogList = () => {
    const blogsLikesInOrder = [...blogState].sort((a, b) =>
      a.likes > b.likes ? -1 : 1
    )

    return (
      <>
        <h2>blogs</h2>
        <h2>{notification}</h2>
        <p>
          {user.username} logged in{' '}
          <button onClick={handleLogout}>logout</button>
        </p>
        {blogsLikesInOrder.map(blog => (
          <Blogs
            key={blog.id}
            blog={blog}
            user={user.username}
          />
        ))}

        <h2>create new blog</h2>
        <Togglable buttonLabel="create">
          <BlogForm handleCreateBlog={handleCreateBlog} />
        </Togglable>
      </>
    )
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>

      <h2>{notification}</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  return <div>{user === null ? loginForm() : blogList()}</div>
}

export default App
