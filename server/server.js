import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import { HabbitRouter } from './routes/habbits-routes.js'
import { AuthRouter } from './routes/auth-routes.js'
import cors from 'cors'
import multer from 'multer'
import * as dotenv from 'dotenv'
import checkAuth from './utils/checkAuth.js'

const app = express()
dotenv.config()

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage })

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.status(200).json({
    url: `/uploads/${req.file.originalname}`
  })
})

mongoose.connect(process.env.MONGO_URL)
  .then((res) => console.log('Connect to DB'))
  .catch((error) => console.log(error))

app.listen(process.env.PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${process.env.PORT}`)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.urlencoded(({ express: false })))

app.use(cors())

app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use(HabbitRouter)
app.use(AuthRouter)

app.use((req, res) => {
  res
    .status(404)
})