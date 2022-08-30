require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const blogRouter = require('./controllers/bloglist.js')
const cors = require('cors')


const mongoUrl = process.env.mongoUrl
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter )

module.exports = app