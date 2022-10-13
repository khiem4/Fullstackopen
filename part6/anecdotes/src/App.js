import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteServices from './services/anecdote'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteServices.getAll()
      .then(anecdotes => dispatch(setAnecdotes(anecdotes))
      )
  })



  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App