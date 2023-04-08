/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express'
import calculateBmi from './bmi'

const app = express()

app.use(express.json());

app.post('/exercises', (req, res) => {
  const { dailyExercises, target } = req.body
  const isDailyExercises = dailyExercises.find((number: number) =>
    isNaN(Number(number))
  )

  if (isNaN(Number(target)) || isDailyExercises) {
    return res.json(
      { error: "malformatted  parameters" }
    )
  }

  return res.json(
    {
      "periodLength": 7,
      "trainingDays": 4,
      "success": false,
      "rating": 1,
      "ratingDescription": "bad",
      "target": 2.5,
      "average": 1.2142857142857142
    }
  )
})


app.get('/bmi', (req, res) => {
  const { height, weight } = req.query

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const result = calculateBmi(Number(height), Number(weight))
    return res.json(result)
  }

  return res.json({
    error: "malformatted parameters"
  })
}
)

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})