import mongoose from 'mongoose'

const habbitSchema = new mongoose.Schema({
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
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // }
}, { timestamps: true })

export default mongoose.model('habbits', habbitSchema)