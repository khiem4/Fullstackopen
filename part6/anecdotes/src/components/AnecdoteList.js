import { useSelector, useDispatch } from "react-redux"
import { notificationMessage, removeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdote)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({
      type: 'ADD_VOTE',
      id: id
    })

    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(notificationMessage(
      `voted "${anecdote.content}"`
    ))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  const votesInOrder = [...anecdotes].sort((a, b) => a.votes < b.votes ? 1 : -1)

  return (
    <>
      {votesInOrder.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}


export default AnecdoteList