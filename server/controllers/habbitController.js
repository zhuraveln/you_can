import Habbit from '../models/habbit.js'
import TrashHabbit from '../models/trash-habbit.js'

const handlError = (res, error) => {
  console.log(error)
}

export const getHabbits = async (req, res) => {
  try {
    // const userId = req.userId

    // const userHabbits = await Habbit.find().populate('user').exec()

    const habbits = await Habbit.find()

    res.status(200).json(habbits)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Failed to get habbit'
    })
  }
}

export const getTrashHabbits = (req, res) => {
  TrashHabbit
    .find()
    .then((trashHabbits) => {
      res
        .status(200).json(trashHabbits)
    })
    .catch((error) => handlError(error))
}

export const createHabbit = async (req, res) => {
  try {
    const { title, type } = req.body

    const doc = new Habbit({
      title,
      type,
      // user: req.userId
    })

    const habbit = await doc.save()

    res.status(200).json(habbit)

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Failed to create habbit'
    })
  }
}

export const deleteHabbit = (req, res) => {

  try {
    const habbitId = req.params.id

    Habbit.findOneAndDelete(
      { _id: habbitId },
      (err, doc) => {
        if (err) {
          console.log(err)
          return res.status(500).json({
            message: 'Failed to get habbit'
          })
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Habbit not found'
          })
        }

        res.status(200).json({
          success: true
        })
      }
    )
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Failed to delete habbit'
    })
  }
}

export const editHabbit = (req, res) => {
  const { title, type } = req.body
  const { id } = req.params

  console.log(title, type, id)
  Habbit
    .findByIdAndUpdate(id, { title, type })
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => handlError(error))
}

export const doneHabbit = async (req, res) => {

  try {
    const { id } = req.params

    Habbit.findOneAndUpdate(
      { _id: id },
      { $inc: { progress: 1 } },
      { returnDocument: 'after' },
      (err, doc) => {
        if (err) {
          console.log(err)
          return res.status(500).json({
            message: 'Failed to get habbit'
          })
        }

        if (!doc) {
          return res.status(404).json({
            message: 'Habbit not found'
          })
        }

        res.status(200).json({
          success: true,
          doc
        })
      }
    )

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Failed to update habbit progress'
    })
  }
}