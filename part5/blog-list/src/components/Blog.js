import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, deleteBlog, likedBlog } from '../reducers/blogReducer'
import { notificationMessage } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import BlogForm from './BlogForm'


const Blogs = ({ username }) => {
  const dispatch = useDispatch()
  const blogState = useSelector(state => state.blog)

  const blogsLikeInOrder = [...blogState].sort(
    (a, b) => a.likes > b.likes ? -1 : 1
  )

  const handleCreateBlog = (blog) => {
    dispatch(createBlog(blog))

    dispatch(notificationMessage(
      `a new blog ${blog.title} by ${blog.author} added`
    ))
    setTimeout(() => {
      dispatch(notificationMessage(null))
    }, 5000)
  }


  return (
    <>
      {blogsLikeInOrder.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          username={username}
        />
      )}
      <Togglable buttonLabel="create">
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
    </>
  )
}

const Blog = ({ blog, username }) => {
  const dispatch = useDispatch()

  const [showBlogDetails, setShowBlogDetails] = useState(false)

  const hide = { display: showBlogDetails ? '' : 'none' }

  const visible = () => {
    setShowBlogDetails(!showBlogDetails)
  }

  const handleLikes = () => {
    const like = { ...blog, likes: blog.likes + 1 }
    dispatch(likedBlog(blog.id, like))
  }

  const handleDelete = () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    dispatch(deleteBlog(blog.id))

    dispatch(notificationMessage('delete completed'))
    setTimeout(() => {
      dispatch(notificationMessage(null))
    }, 5000)
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const blogDetail = () => {
    if (showBlogDetails) {
      return (
        <>
          <p>
            likes {blog.likes}
            <button onClick={handleLikes}>like</button>
          </p>
          <p>{blog.url}</p>
        </>
      )
    }
  }


  return (
    <div>
      <div style={blogStyle} className="blog">
        <p>{blog.title}</p>
        <p>{blog.author}</p>
        <button onClick={visible}>view</button>
        <div style={hide}>
          {blogDetail()}
          {username === blog.user.username && (
            <button onClick={handleDelete}>remove</button>
          )}
        </div>
      </div>
    </div>
  )
}



export default Blogs
