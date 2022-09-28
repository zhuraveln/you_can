const Habbit = require('../models/habbit')
const TrashHabbit = require('../models/trash-habbit')
const createPath = require('../helpers/create-path')

const handlError = (res, error) => {
  console.log(error)
}

const getHabbits = (req, res) => {
  let property

  if (req.params.type === 'type') {
    console.log('type')
    property = { createdAt: 1 }
  } else if (req.params.type === 'progress') {
    console.log('progress')
  } else {
    console.log('date')
    property = { createdAt: -1 }
  }

  Habbit
    .find()
    .sort(property)
    .then((habbits) => res.render(createPath('index'), { habbits }))
    .catch((error) => handlError(error))
}

const getRandomTrashHabbit = (req, res) => {
  TrashHabbit
    .find()
    .then(trashHabbits => res.send(trashHabbits))
    .catch((error) => handlError(error))
}

const getEditHabbit = (req, res) => {
  Habbit
    .findById(req.params.id)
    .then(habbit => res.send(habbit))
    .catch((error) => handlError(error))
}

const editHabbit = (req, res) => {
  const { title, type, progress } = req.body
  const { id } = req.params
  Habbit
    .findByIdAndUpdate(id, { title, type, progress })
    .then(result => res.redirect('/'))
    .catch((error) => handlError(error))
}

const doneHabbit = (req, res) => {
  const { id } = req.params
  Habbit
    .findById(id)
    .then(habbit => {
      let progress = habbit.progress
      progress++
      Habbit
        .findByIdAndUpdate(id, { progress })
        .then(result => res.send('done'))
        .catch((error) => handlError(error))
    })
    .catch((error) => handlError(error))
}

const postHabbit = (req, res) => {
  const { title, type } = req.body
  const habbit = new Habbit({ title, type })
  habbit
    .save()
    .then((result) => res.redirect('/'))
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

module.exports = {
  getHabbits,
  postHabbit,
  getRandomTrashHabbit,
  deleteHabbit,
  getEditHabbit,
  editHabbit,
  doneHabbit,
}