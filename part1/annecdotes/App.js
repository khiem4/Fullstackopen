import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(7).fill(0))

  const handleClick = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const voteClick = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }


  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={voteClick} text="vote" />
      <Button onClick={handleClick} text='next anecdotes' />
      <CheckVotes votes={votes} anecdotes={anecdotes} />
    </div>
  )
}


const CheckVotes = ({ votes, anecdotes }) => {
  let i = votes.indexOf(Math.max(...votes))
  return (
    <>
      <h2>highest voted anecdote</h2>
      <p>{anecdotes[i]}</p>

    </>
  )
}


const Button = (props) => {
  return (
    <button
      onClick={props.onClick}>
      {props.text}
    </button>
  )
}

export default App