const mongoose = require('mongoose')
const Schema = mongoose.Schema

const habbitSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
}, { timestamps: true })

const Habbit = mongoose.model('habbits', habbitSchema)

module.exports = Habbit