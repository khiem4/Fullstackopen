require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(() => {
        console.log(`connect to ${url}`)
    })
    .catch(() => {
        console.log(`error can't connect`)
    })

const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date
})

phoneBookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = new mongoose.model('Person', phoneBookSchema)