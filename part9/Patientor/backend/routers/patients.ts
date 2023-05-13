/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientService from "../services/patientService";
import patientsData from "../data/patients";


const patientsRouter = express.Router()

patientsRouter.get('/', (_req, res) => {
  res.json(patientService.getExcludeSsnPatient())
})

patientsRouter.get('/:id', (req, res) => {
  const id = req.params.id
  const patient = patientsData.find(p => p.id === id)

  res.json(patient)
})

patientsRouter.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation, entries } = req.body

  const newPatient = patientService.addPatient(
    {
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
      entries
    }
  )

  res.json(newPatient).status(200)
})

export default patientsRouter