import patientsData from "../data/patients";
import { excludeSsnPatient, patient } from "../types";

const getPatients = (): patient[] => {
  return patientsData
}

const getExcludeSsnPatient = (): excludeSsnPatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => (
    {
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }
  ))
}

export default {
  getPatients,
  getExcludeSsnPatient,
}