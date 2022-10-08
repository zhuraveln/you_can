const express = require('express')
const {
  getHabbits,
  postHabbit,
  deleteHabbit,
  getTrashHabbits,
  editHabbit,
  doneHabbit,
} = require('../controllers/habbit-controller')

const router = express.Router()

// Get All Habbits from db
router.get('/', getHabbits)

// Get All Trash Habbits from db
router.get('/random', getTrashHabbits)

// Post Habbit to db
router.post('/', postHabbit)

// Delete Habbit in db
router.delete('/:id', deleteHabbit)

// Edit Habbit in db
router.put('/edit/:id', editHabbit)

// Day done Habbit in db
router.put('/done/:id', doneHabbit)

module.exports = router