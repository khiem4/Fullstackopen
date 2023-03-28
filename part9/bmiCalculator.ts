function calculateBmi(height: number, weight: number): string {
  const toMeter = height / 100
  const bmi = weight / (toMeter * toMeter)

  if (bmi > 18.5 && bmi < 24.9) {
    return 'Normal (healthy weight)'
  }
}

console.log(calculateBmi(180, 74))