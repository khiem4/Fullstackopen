const e = require('express')
const mongoose = require('mongoose')



const password = process.argv[2]



const url = `mongodb+srv://khiem4:${password}@cluster0.qabisdn.mongodb.net/Phonebook?retryWrites=true&w=majority`

const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date
})

const Person = new mongoose.model('Person', phoneBookSchema)


if (process.argv.length === 3) {
    mongoose.connect(url)
    Person
        .find({})
        .then(persons => {
            persons.forEach(person => {
                console.log(person)
                mongoose.connection.close()
            })
        })
} else {
    mongoose
        .connect(url)
        .then(result => {
            console.log('connected')
            const person = new Person({
                name: process.argv[3],
                number: process.argv[4],
                date: new Date()
            })
            if (!person.name) {
                return console.log('failed to add')
            }

            return person.save()
        })
        .then(() => {
            console.log('saved')
            mongoose.connection.close()
        })
        .catch(error => console.log(error))
}

