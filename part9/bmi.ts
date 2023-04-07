interface values {
  value1: number,
  value2: number
}

function parseArgs(args: string[]): values {
  if (args.length > 4) throw new Error('Too many arguments')
  if (args.length < 4) throw new Error('Not enough arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

export default function calculateBmi(height: number, weight: number): string {
  const toMeter = height / 100
  const bmi = weight / (toMeter * toMeter)

  if (bmi > 18.5 && bmi < 24.9) {
    return 'Normal (healthy weight)'
  }
  else if (bmi < 18.5) {
    return 'Skinny (unhealthy weight)'
  }
  else {
    return 'Overweight (unhealthy weight)'
  }
}

try {
  const { value1, value2 } = parseArgs(process.argv)
  console.log(calculateBmi(value1, value2))
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message)
  }
}



