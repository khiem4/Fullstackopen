import patientsData from "../data/patients";
import { excludeSsnPatient, Gender, newPatient, Patient } from "../types";
import { v1 as uuid } from 'uuid'

const getPatients = (): Patient[] => {
  return patientsData
}

const getExcludeSsnPatient = (): excludeSsnPatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => (
    {
      id,
      name,
      dateOfBirth,
      gender: gender as Gender,
      occupation
    }
  ))
}

const addPatient = (obj: newPatient): Patient => {
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