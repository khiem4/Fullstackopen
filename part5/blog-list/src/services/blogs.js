import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (id, changeBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, changeBlog)
  return response.data
}



const blogService = {
  getAll,
  create,
  setToken,
  update
}

export default blogService