import { createSlice } from "@reduxjs/toolkit"

const initialState = [null]


const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationMessage(state, action) {
      const content = action.payload
      state = ''
      return state.concat(content)
    },
    removeNotification(state, action) {
      return state = null
    }
  }
})



export const {
  notificationMessage,
  removeNotification
} = notificationSlice.actions

export default notificationSlice.reducer