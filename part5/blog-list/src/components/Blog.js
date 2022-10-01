import { useState } from 'react'
// import PropTypes from 'prop-types'


const Blog = ({ blog, handleBlogLikes, handleDeleteBlog, user }) => {
  const [showBlogDetails, setShowBlogDetails] = useState(false)

  const hide = { display: showBlogDetails ? '' : 'none' }

  const visible = () => {
    setShowBlogDetails(!showBlogDetails)
  }

  const handleLikes = () => {
    const changeBlog = { ...blog, likes: blog.likes + 1 }

    handleBlogLikes(blog.id, changeBlog)
  }

  const deleteBlog = () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    handleDeleteBlog(blog.id)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div style={blogStyle} className='blog'>
      {blog.title}
      <button onClick={visible}>view</button>
      <div style={hide}>
        <p>likes {blog.likes} <button onClick={handleLikes}>like</button></p>
        <p>{blog.url}</p>
        <p>{blog.author}</p>
        {
          user === blog.user.username &&
          <button onClick={deleteBlog}>remove</button>
        }
      </div>
    </div>
  )
}


// Blog.propTypes = {
//   blog: PropTypes.object.isRequired,
//   handleBlogLikes: PropTypes.func.isRequired,
//   handleDeleteBlog: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired
// }

export default Blog