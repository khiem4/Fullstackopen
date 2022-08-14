const express = require("express")
const app = express()

app.use(express.json())

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1,
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2,
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3,
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4,
    },
]
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send
        (`Phonebook has info for ${persons.length} people <br/>${Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    }
    response.status(404).end()
})


app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter((person) => person.id !== id)

    response.status(204).end()
})


const randomId = () => {
    return Math.floor(Math.random() * 100)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    const newPerson = {
        name: body.name,
        number: body.number,
        id: randomId()
    }
    const checkName = persons.find(p => p.name === newPerson.name)

    if (checkName) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    } else if (!newPerson.name || !newPerson.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    persons = persons.concat(newPerson)

    response.json(newPerson)
})


const PORT = 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})