require('dotenv').config()

const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require('cors')
const Persons = require('./models/phonebook')
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
    const get = Persons.find({}).then(person => {
        response.json(person)
    })
})


app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const newPerson = new Persons({
        name: body.name,
        number: body.number,
        date: new Date()
    })

    newPerson.save()
        .then(result => response.json(result))
        .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Persons.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})


app.get('/info', (request, response) => {
    Persons.find({})
        .then(result => response.send(`Phonebook has info for ${result.length} people <br/>${Date()}`))
        .catch(error => next(error))
})



app.get('/api/persons/:id', (request, response, next) => {
    Persons.find({ _id: request.params.id })
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))
})


app.delete("/api/persons/:id", (request, response, next) => {
    Persons.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
            console.log(result)
        })
        .catch(error => next(error))
})


const errorHandle = (error, request, response, next) => {
    console.error(error)
    if (error = 'CastError') {
        return response.status(404).send({ error: 'wrong id' })
    }

    next(error)
}


app.use(errorHandle)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`connect to server ${PORT}`)
})

