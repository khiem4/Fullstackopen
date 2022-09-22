import { useState } from "react"



const Blog = ({ blog }) => {
  const [showBlogDetails, setShowBlogDetails] = useState(false)

  const show = { display: showBlogDetails ? 'none' : '' }

  const visible = () => {
    setShowBlogDetails(!showBlogDetails)
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
      <div style={show}>
        <p>likes {blog.likes}  <button>like</button></p>
        <p>{blog.url}</p>
        <p>{blog.author}</p>
      </div>
    </div>
  )
}

export default Blog