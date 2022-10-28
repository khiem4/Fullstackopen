import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { notificationMessage } from './notificationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    logged(state, action) {
      return action.payload
    },
    savedUserTokenAndName(state, action) {
      return action.payload
    },
    logout(state, action) {
      return action.payload
    }
  }
})

export const { savedUserTokenAndName, logout, logged } = loginSlice.actions

export const userLogin = ({ username, password }) => {
  return async dispatch => {
    try {
      const tokenAndUsername = await loginService.login({ username, password })
      dispatch(savedUserTokenAndName(tokenAndUsername))

      blogService.setToken(tokenAndUsername.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(tokenAndUsername))

      dispatch(notificationMessage(`${username} login`))
      setTimeout(() => {
        dispatch(notificationMessage(null))
      }, 5000)
    }
    catch (err) {
      dispatch(notificationMessage('Wrong username or password'))
      setTimeout(() => {
        dispatch(notificationMessage(null))
      }, 5000)
    }
  }
}

export const userLogout = () => {
  return dispatch => {
    dispatch(logout(null))
    window.localStorage.removeItem('loggedBlogAppUser')
  }
}

export const setUser = (userInformation) => {
  return dispatch => {
    dispatch(logged(userInformation))
  }
}



export default loginSlice.reducer