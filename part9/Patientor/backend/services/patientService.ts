import patientsData from "../data/patients";
import { excludeSsnPatient, newPatient, patient } from "../types";
import { v1 as uuid } from 'uuid'

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

const addPatient = (obj: newPatient): patient => {
  const id = uuid()
  const newPatient = {
    id,
    ...obj
  }

  patientsData.push(newPatient)

  return newPatient
}

export default {
  getPatients,
  getExcludeSsnPatient,
  addPatient,
}