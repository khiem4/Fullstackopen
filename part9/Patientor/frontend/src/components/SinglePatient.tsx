import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import patientService from "../services/patients"
import { Patient } from "../types"

function SinglePatient() {
    const [patient, setPatient] = useState<Patient>()
    const { id } = useParams()
    console.log('id:', id)

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
                </div>
            }
        </>
    )
}

export default SinglePatient