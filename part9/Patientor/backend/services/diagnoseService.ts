import diagnosesData from "../data/diagnoses";
import { diagnose } from "../types";

const getDiagnoses = (): diagnose[] => {
  return diagnosesData
}

export default {
  getDiagnoses,
}