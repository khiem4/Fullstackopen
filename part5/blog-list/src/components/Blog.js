import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likedBlog, commentBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const handleLikes = () => {
    const like = { ...blog, likes: blog.likes + 1 }
    dispatch(likedBlog(blog.id, like))
  }

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog.id, comment))
    setComment('')
  }

  const padding = {
    padding: 10
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <div>
        <h3>{blog.title}</h3>
        <a href={blog.url}>{blog.url}</a>
        <p>
          {blog.likes}
          <button onClick={handleLikes}>likes</button>
        </p>
        <p>added by {blog.author}</p>
      </div >

      <h4>comments</h4>
      <form onSubmit={handleComment} style={padding}>
        <div>
          <input
            type='text'
            value={comment}
            name="comments"
            onChange={({ target }) => setComment(target.value)}
          />
          <button>post</button>
        </div>
      </form>
      {blog.comments.map(comment =>
        <li key={comment.id}>{comment.comment}</li>
      )}
    </div>
  )
}

export default Blog