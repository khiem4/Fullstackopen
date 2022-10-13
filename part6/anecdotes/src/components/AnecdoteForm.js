import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notificationMessage, removeNotification } from "../reducers/notificationReducer"
import anecdoteServices from "../services/anecdote"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    const anecdote = await anecdoteServices.create(content)
    dispatch(createAnecdote(anecdote))

    dispatch(notificationMessage(
      `add "${content}"`
    ))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm