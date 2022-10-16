import { createSlice } from "@reduxjs/toolkit"

let timeoutId


const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notificationMessage(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return state = ''
    }
  }
})

export const {
  notificationMessage,
  removeNotification
} = notificationSlice.actions



export const setNotification = (message, timer) => {
  return dispatch => {
    dispatch(notificationMessage(message))

    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, timer)
  }
}

export default notificationSlice.reducer