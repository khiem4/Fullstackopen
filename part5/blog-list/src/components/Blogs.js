import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      {blogs.map(blog =>
        <li key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </li>
      )}
      <Togglable buttonLabel="create">
        <BlogForm />
      </Togglable>
    </div>
  )
}




export default Blogs

