import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blog'
import Users from './components/users'
import { initialBlogs } from './reducers/blogReducer'
import { userLogin, userLogout, setUser } from './reducers/loginReducer'
import blogService from './services/blogs'


const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const loggedInformation = useSelector(state => state.login)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initialBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(userLogin({ username, password }))
  }

  const handleLogout = () => {
    dispatch(userLogout())
  }

  const blogList = () => {
    return (
      <div>
        <h2>blogs</h2>
        <h2>{notification}</h2>
        <p>
          {loggedInformation.username} logged in{' '}
          <button onClick={handleLogout}>logout</button>
        </p>
        <Routes>
          <Route path='/' element={<Blogs username={loggedInformation.username} />} />
          <Route path='/users' element={<Users />} />
        </Routes>
      </div>
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

  return (
    <div>
      {loggedInformation === null ? loginForm() : blogList()}
    </div>)
}

export default App
