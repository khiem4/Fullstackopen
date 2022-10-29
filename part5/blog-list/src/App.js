import { Routes, Route, useMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blog'
import Users from './components/Users'
import LoginForm from './components/LoginForm'
import { userLogout } from './reducers/loginReducer'
import UserBlogs from './components/UserBlog'
import { useEffect } from 'react'
import { initialBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const loggedInformation = useSelector(state => state.login)
  const blogs = useSelector(state => state.blog)

  useEffect(() => {
    dispatch(initialBlogs())
  }, [])

  const match = useMatch('/users/:id')
  const userBlogs = match
    ? blogs.filter(blog => blog.user.id === match.params.id)
    : null

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
          <Route path='/' element={<Blogs blogs={blogs} />} />
          <Route path='/users/:id' element={<UserBlogs userBlogs={userBlogs} />} />
          <Route path='/users' element={<Users />} />
        </Routes>
      </div>
    )
  }

  return (
    <div>
      {loggedInformation === null ? <LoginForm /> : blogList()}
    </div>)
}

export default App
