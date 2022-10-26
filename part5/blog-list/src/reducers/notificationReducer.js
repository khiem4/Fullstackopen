import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notification(state, action) {
      return action.payload
    },
  }
})


export const { notification } = notificationSlice.actions

export const notificationMessage = (message) => {
  return dispatch => {
    dispatch(notification(message))
  }
}


export default notificationSlice.reducer