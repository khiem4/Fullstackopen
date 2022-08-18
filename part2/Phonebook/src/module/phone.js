import axios from 'axios'
const baseUrl = '/api/persons'


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

const update = (id, newNumber) => {
    return axios
        .put(`${baseUrl}/${id}`, newNumber)
        .then(response => response.data)
}

// eslint-disable-next-line
export default { getAll, create, update }