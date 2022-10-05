const express = require('express')
const {
  getHabbits,
  postHabbit,
  deleteHabbit,
  getRandomTrashHabbit,
  getEditHabbit,
  editHabbit,
  doneHabbit,
} = require('../controllers/habbit-controller')

const router = express.Router()

router.get('/', getHabbits)

router.get('/random', getRandomTrashHabbit)

router.get('/:type', getHabbits)

router.get('/edit/:id', getEditHabbit)

router.post('/', postHabbit)

router.put('/edit/:id', editHabbit)

router.put('/done/:id', doneHabbit)

router.delete('/:id', deleteHabbit)

module.exports = router