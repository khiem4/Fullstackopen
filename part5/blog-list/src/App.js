import { useState, useEffect } from 'react'
import Blogs from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { createBlog, initialBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { notificationMessage } from './reducers/notificationReducer'
import { userLogin, userLogout, savedUserLogged } from './reducers/userReducer'


const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const userInformation = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initialBlogs())
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(savedUserLogged(user))
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(userLogin({ username, password }))
  }

  const handleLogout = () => {
    dispatch(userLogout())
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
    return (
      <>
        <h2>blogs</h2>
        <h2>{notification}</h2>
        <p>
          {userInformation.username} logged in{' '}
          <button onClick={handleLogout}>logout</button>
        </p>

        <Blogs username={userInformation.username} />
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

  return <div>{userInformation === null ? loginForm() : blogList()}</div>
}

export default App
