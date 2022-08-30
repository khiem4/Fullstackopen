require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const blogRouter = require('./controllers/bloglist')



const mongoUrl = process.env.mongoUrl
mongoose.connect(mongoUrl)


app.use(express.json())

app.use('/api/blogs', blogRouter )

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})