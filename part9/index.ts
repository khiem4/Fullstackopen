import express from 'express'
import calculateBmi from './bmi'

const app = express()

app.get('/hello', (_req, res) => {
  res.json('hello fullstack')
})

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const result = calculateBmi(Number(height), Number(weight))
    return res.json(result)
  } else {
    return res.json({
      error: "malformatted parameters"
    })
  }
})


const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})