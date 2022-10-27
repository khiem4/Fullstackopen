import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      const blog = action.payload
      return state.concat(blog)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
    likeBlog(state, action) {
      const blogLiked = action.payload
      return state.map(blog =>
        blog.id !== blogLiked.id ? blog : blogLiked)
    }
  }
})

export const { setBlogs, appendBlog, removeBlog, likeBlog } = blogSlice.actions

export const initialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const returnedBlog = await blogService.create(blog)
    dispatch(appendBlog(returnedBlog))
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const likedBlog = (id, like) => {
  return async dispatch => {
    const blog = await blogService.update(id, like)
    dispatch(likeBlog(blog))
  }
}


export default blogSlice.reducer