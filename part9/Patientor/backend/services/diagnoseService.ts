import diagnosesData from "../data/diagnoses";
import patientsData from "../data/patients";
import { diagnose, patient } from "../types";

const getDiagnoses = (): diagnose[] => {
  return diagnosesData
}

const getPatients = (): patient[] => {
  return patientsData
}

export default {
  getDiagnoses,
  getPatients,
}