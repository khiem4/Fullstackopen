import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const goodClick = () => setGood(good + 1)
  const badClick = () => setBad(bad + 1)
  const neutralClick = () => setNeutral(neutral + 1)


  return (
    <>
      <h2>give feedback</h2>
      <Button handleClick={goodClick} text='good' />
      <Button handleClick={neutralClick} text='neutral' />
      <Button handleClick={badClick} text='bad' />
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistics good={good} neutral={neutral} bad={bad}
            all
            average
            positive />
        </tbody>
      </table>
    </>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button
      onClick={handleClick}>{text}
    </button>
  )
}

const Statistics = (props) => {
  const { bad, neutral, good } = props
  const all = bad + good + neutral
  const average = (good - bad) / (all)
  const positive = good / (all) * 100

  if (all === 0) {
    return <StatisticLine text="No feedback given" />
  }

  return (
    <>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text} </td>
      <td>{props.value} </td>
    </tr>
  )
}

export default App