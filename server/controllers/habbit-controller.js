const Habbit = require('../models/habbit')
const TrashHabbit = require('../models/trash-habbit')
const createPath = require('../helpers/create-path')

const handlError = (res, error) => {
  console.log(error)
}

const getHabbits = (req, res) => {
  Habbit
    .find()
    .then((habbits) => {
      res
        .status(200).json(habbits)
    })
    .catch((error) => handlError(error))
}

const getTrashHabbits = (req, res) => {
  TrashHabbit
    .find()
    .then((trashHabbits) => {
      res
        .status(200).json(trashHabbits)
    })
    .catch((error) => handlError(error))
}

const postHabbit = (req, res) => {
  const { title, type } = req.body

  const habbit = new Habbit({ title, type })
  habbit
    .save()
    .then(() => res.status(200).json(habbit._doc))
    .catch((error) => handlError(error))
}

const deleteHabbit = (req, res) => {
  Habbit
    .findByIdAndDelete(req.params.id)
    .then(result => {
      res.sendStatus(200)
    })
    .catch((error) => handlError(error))
}

const editHabbit = (req, res) => {
  const { title, type } = req.body
  const { id } = req.params
  Habbit
    .findByIdAndUpdate(id, { title, type })
    .then(() => res.status(200).json({ "success": "True" }))
    .catch((error) => handlError(error))
}

const doneHabbit = (req, res) => {
  const { id } = req.params
  Habbit
    .findById(id)
    .then(habbit => {
      const progress = habbit.progress + 1

      Habbit
        .findByIdAndUpdate(id, { progress })
        .then(() => res.status(200).json({ "success": "True" }))
        .catch((error) => handlError(error))
    })
    .catch((error) => handlError(error))
}

module.exports = {
  getHabbits,
  postHabbit,
  getTrashHabbits,
  deleteHabbit,
  editHabbit,
  doneHabbit,
}