import { createSlice } from "@reduxjs/toolkit"



const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  }
})



export const { createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer