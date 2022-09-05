const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const blogRouter = require('./controllers/bloglist.js')
const cors = require('cors')


mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app