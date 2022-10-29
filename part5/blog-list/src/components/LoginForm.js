import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, userLogin } from '../reducers/loginReducer'
import blogService from '../services/blogs'

const LoginForm = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(userLogin({ username, password }))
  }

  return (
    <div>
      <h2>log in to application</h2>
      <h2>{notification}</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div >
  )
}

export default LoginForm