import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import patientService from "../services/patients"
import { Patient } from "../types"

function SinglePatient() {
    const [patient, setPatient] = useState<Patient>()
    const { id } = useParams()

    useEffect(() => {
        const fetchOnePatient = async () => {
            if (id) {
                const data = await patientService.getOne(id)
                return setPatient(data)
            }
        }
        fetchOnePatient()
    }, [id])

    return (
        <>
            {patient
                &&
                <div>
                    <p>{patient.name}</p>
                    <p>{patient.ssn}</p>
                    <p>{patient.occupation}</p>
                    <h3>entries</h3>
                    {patient.entries.map((v, index) =>
                        <div key={index + 1}>
                            <p>{v.date}</p>
                            <p>{v.description}</p>
                            {v.diagnosisCodes?.map((item, index) =>
                                <ul key={index + 1}>
                                    <li>{item}</li>
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            }
        </>
    )
}

export default SinglePatient