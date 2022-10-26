import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likedBlog } from '../reducers/blogReducer'
import { notificationMessage } from '../reducers/notificationReducer'


const Blogs = (props) => {
  const blogState = useSelector(state => state.blog)
  const blogsLikeInOrder = [...blogState].sort(
    (a, b) => a.likes > b.likes ? -1 : 1
  )

  return (
    <>
      {blogsLikeInOrder.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />)}
    </>
  )
}


const Blog = ({ blog, user }) => {
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
    if (showBlogDetails === true) {
      return (
        <>
          {/* {blogsLikeInOrder.map(blog =>
          )} */}
          <p>
            likes {blog.likes} <button onClick={handleLikes}>like</button>
          </p>
          <p>{blog.url}</p>
        </>
      )
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <p>{blog.title}</p>
      <p>{blog.author}</p>
      <button onClick={visible}>view</button>
      <div style={hide}>
        {blogDetail()}
        {user === blog.user.username && (
          <button onClick={handleDelete}>remove</button>
        )}
      </div>
    </div>
  )
}



export default Blog
