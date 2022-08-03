import axios from 'axios'


const baseUrl = 'http://localhost:3001/persons'


const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => response.data)
}

const create = (newNameNumber) => {
    return axios
        .post(baseUrl, newNameNumber)
        .then(response => response.data)
}


export default { getAll, create }