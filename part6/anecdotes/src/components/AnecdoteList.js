import { useSelector, useDispatch } from "react-redux"
import { notificationMessage, removeNotification } from "../reducers/notificationReducer"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdote)
  const filterState = useSelector(state => state.filter)
  const dispatch = useDispatch()


  const vote = (id) => {
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    const anecdoteVoted = { ...anecdote, votes: anecdote.votes + 1 }

    dispatch(voteAnecdote(id, anecdoteVoted))

    dispatch(notificationMessage(
      `voted "${anecdote.content}"`
    ))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  const votesInOrder = [...anecdotes].sort((a, b) => a.votes < b.votes ? 1 : -1)


  const filter = filterState
    ? votesInOrder.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filterState)
    )
    : votesInOrder

  return (
    <>
      {filter.map(anecdote =>
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