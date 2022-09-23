import { useState } from "react"



const Blog = ({ blog, handleBlogLikes }) => {
  const [showBlogDetails, setShowBlogDetails] = useState(false)

  const hide = { display: showBlogDetails ? '' : 'none' }

  const visible = () => {
    setShowBlogDetails(!showBlogDetails)
  }

  const handleLikes = () => {
    const changeBlog = { ...blog, likes: blog.likes + 1 }

    handleBlogLikes(blog.id, changeBlog)
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={visible}>view</button>
      <div style={hide}>
        <p>likes {blog.likes} <button onClick={handleLikes}>like</button></p>
        <p>{blog.url}</p>
        <p>{blog.author}</p>
      </div>
    </div>
  )
}

export default Blog