import { Routes, Route, useMatch, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import Users from './components/Users'
import LoginForm from './components/LoginForm'
import { userLogout } from './reducers/loginReducer'
import UserBlogs from './components/UserBlog'
import { useEffect } from 'react'
import { initialBlogs } from './reducers/blogReducer'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const loggedInformation = useSelector(state => state.login)
  const blogs = useSelector(state => state.blog)

  useEffect(() => {
    dispatch(initialBlogs())
  }, [])

  const matchUserId = useMatch('/users/:id')
  const userBlogs = matchUserId
    ? blogs.filter(blog => blog.user.id === matchUserId.params.id)
    : null

  const matchBlogId = useMatch('/blogs/:id')
  const blog = matchBlogId
    ? blogs.find(blog => blog.id === matchBlogId.params.id)
    : null

  const handleLogout = () => {
    dispatch(userLogout())
  }

  const blogsLikeInOrder = [...blogs].sort(
    (a, b) => a.likes > b.likes ? -1 : 1
  )

  const padding = {
    padding: 5
  }
  const blogList = () => {
    return (
      <div>
        <div>
          <Link style={padding} to={'/blogs'}>blogs</Link>
          <Link style={padding} to={'/users'}>users</Link>
          {loggedInformation.username} logged in
          <button onClick={handleLogout}>logout</button>
        </div>

        <div>
          <h2>blogs</h2>
          <h2>{notification}</h2>
          <Routes>
            <Route path='/' element={<Blogs blogs={blogsLikeInOrder} />} />
            <Route path='/users/:id' element={<UserBlogs userBlogs={userBlogs} />} />
            <Route path='/users' element={<Users />} />
            <Route path='/blogs/:id' element={<Blog blog={blog} />} />
          </Routes>
        </div>
      </div >
    )
  }

  return (
    <div>
      {loggedInformation === null ? <LoginForm /> : blogList()}
    </div>)
}

export default App
