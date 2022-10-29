import { useDispatch } from 'react-redux'
import { likedBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const handleLikes = () => {
    const like = { ...blog, likes: blog.likes + 1 }
    dispatch(likedBlog(blog.id, like))
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <>
        <h3>{blog.title}</h3>
        <a href={blog.url}>{blog.url}</a>
        <p>
          {blog.likes}
          <button onClick={handleLikes}>likes</button>
        </p>
        <p>added by {blog.author}</p>
      </>
    </div >
  )
}

export default Blog