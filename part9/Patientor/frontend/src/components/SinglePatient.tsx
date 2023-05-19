import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import patientService from "../services/patients"
import { Diagnosis, Patient } from "../types"
import diagnoseService from "../services/diagnose"
import EntryDetails from "./EntryDetails"

function SinglePatient() {
    const [patient, setPatient] = useState<Patient>()
    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
    const { id } = useParams()

    useEffect(() => {
        const fetchOnePatient = async () => {
            if (id) {
                const data = await patientService.getOne(id)
                return setPatient(data)
            }
        }
        void fetchOnePatient()

        const fetchDiagnosis = async () => {
            const diagnosis = await diagnoseService.getAll()
            setDiagnosis(diagnosis)
        }
        void fetchDiagnosis()
    }, [id])

    const test = patient?.entries.flatMap(e => e.diagnosisCodes)

    const patientDiagnosis = diagnosis.filter(item => test?.includes(item.code))

    return (
        <>
            {patient
                &&
                <div>
                    <p>{patient.name}</p>
                    <p>{patient.ssn}</p>
                    <p>{patient.occupation}</p>
                    <h3>entries</h3>

                    {patient.entries.map((e, index) =>
                        <div key={index + 1}>
                            <p>{e.date} {e.description}</p>
                            <EntryDetails entry={e} />
                            <p>diagnose by {e.specialist}</p>
                        </div>
                    )}


                    {patientDiagnosis?.map((item, index) =>
                        <ul key={index + 1}>
                            <li>{item.code} {item.name}</li>
                        </ul>
                    )}
                </div>
            }
        </>
    )
}

export default SinglePatient