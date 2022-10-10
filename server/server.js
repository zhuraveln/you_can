const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
const HabbitRoutes = require('./routes/habbits-routes')
const cors = require('cors');

const app = express()

mongoose
  .connect(process.env.MONGO_URL)
  .then((res) => console.log('Connect to DB'))
  .catch((error) => console.log(error))

app.listen(process.env.PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${process.env.PORT}`)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.urlencoded(({ express: false })))

app.use(express.static('public'))

app.use(cors())

app.use(express.json())

app.use(HabbitRoutes)

app.use((req, res) => {
  res
    .status(404)
})