interface exercises {
  multipleValues: number[],
  target: number
}

interface multipleValues {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

function parseArray(args: string[]): exercises {
  if (args.length < 4) throw new Error('not enough arguments')

  const userData = args.slice(2).map(Number)

  if (!isNaN(Number(args[2]))) {
    return {
      multipleValues: userData,
      target: Number(args[2])
    }
  } else {
    throw new Error('target need to be a number')
  }
}

function exerciseCalculator(exercises: number[], target: number): multipleValues {
  const periodLength = exercises.length
  const trainingDays = exercises.filter(hour => hour > 0).length
  const trainingHoursTotal = exercises.reduce((a, c) => a + c)
  const average = trainingHoursTotal / periodLength
  const success = average >= target
  const successRate = average / target
  let rating: number
  let ratingDescription: string

  if (successRate < 0.75) {
    rating = 1
    ratingDescription = "You failed"
  }
  if (successRate < 1) {
    rating = 2
    ratingDescription = "Not too bad"
  }
  else {
    rating = 3
    ratingDescription = "You success"
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

try {
  const { multipleValues, target } = parseArray(process.argv)
  console.log(exerciseCalculator(multipleValues, target))
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message)
  }
}

