import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({
      type: 'ADD_VOTE',
      id: id
    })
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch({
      type: 'ADD_ANECDOTE',
      data: {
        content: content,
        votes: 0
      }
    })
  }


  const votesInOrder = anecdotes.sort((a, b) => a.votes < b.votes ? 1 : -1)

  return (
    <div>
      <h2>Anecdotes</h2>
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
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App