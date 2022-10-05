const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
require('dotenv').config()
const HabbitRoutes = require('./routes/habbits-routes')
const createPath = require('./helpers/create-path')

const app = express()

app.set('view engine', 'ejs')

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

app.use(methodOverride('_method'))

app.use(HabbitRoutes)

app.use((req, res) => {
  const title = 'Error page'
  res
    .status(404)
    .render(createPath('error-page'), { title })
})