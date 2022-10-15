import { createSlice } from "@reduxjs/toolkit"
import anecdoteServices from "../services/anecdote"



const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    appendNote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    vote(state, action) {
      const anecdoteVoted = action.payload

      return state.map(anecdote =>
        anecdote.id !== anecdoteVoted.id
          ? anecdote
          : anecdoteVoted)
    }
  }
})

export const { appendNote, setAnecdotes, vote } = anecdoteSlice.actions


export const voteAnecdote = (id, anecdote) => {
  return async dispatch => {
    const voted = await anecdoteServices.update(id, anecdote)
    dispatch(vote(voted))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteServices.create(content)
    dispatch(appendNote(newAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}




export default anecdoteSlice.reducer