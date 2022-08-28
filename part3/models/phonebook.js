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
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function (v) {
                return /\d{2,3}-\d{6}/.test(v)
            },
            message: props => `${props.value} is not a valid phone number`
        },
        required: [true, 'User phone number required']
    },
    date: {
        type: Date,
        required: true
    }
})


phoneBookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = new mongoose.model('Person', phoneBookSchema)