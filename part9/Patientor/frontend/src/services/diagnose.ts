import axios from "axios"
import { Diagnosis } from "../types"

const getAll = async () => {
    const { data } = await axios.get<Diagnosis[]>('http://localhost:3001/api/diagnoses')
    return data
}

const diagnoseService = {
    getAll
}

export default diagnoseService
