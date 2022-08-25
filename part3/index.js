require('dotenv').config()

const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require('cors')
const Person = require('./models/phonebook')
const mongoose = require('mongoose')



app.use(cors())

app.use(express.static('build'))

app.use(express.json())

morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(morgan(`
:method 
:url 
:body`))


app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})


app.post('/api/persons', (request, response) => {
    const body = request.body
    const newPerson = new Person({
        name: body.name,
        number: body.number,
        date: new Date()
    })

    // const checkName = persons.find(p => p.name === newPerson.name)

    // if (checkName) {
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // } else if (!newPerson.name || !newPerson.number) {
    //     return response.status(400).json({
    //         error: 'name or number is missing'
    //     })
    // }
    newPerson.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
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
    Person.findByIdAndRemove(request.params.id)
        .then(result => {

            response.status(204).end()
            console.log(result)
        })
        .catch(error => next(error))
})

const errorHandle = (error, request, response, next) => {
    console.error(error)

    next(error)
}

app.use(errorHandle)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`connect to server ${PORT}`)
})

