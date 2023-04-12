/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientService from "../services/patientService";


const patientsRouter = express.Router()

patientsRouter.get('/', (_req, res) => {
  res.json(patientService.getExcludeSsnPatient())
})

patientsRouter.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body

  const newPatient = patientService.addPatient(
    {
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation
    }
  )

  res.json(newPatient).status(200)
})

export default patientsRouter