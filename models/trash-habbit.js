const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trashHabbitSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  }
}, { timestamps: true })

const TrashHabbit = mongoose.model('trashhabbits', trashHabbitSchema)

module.exports = TrashHabbit