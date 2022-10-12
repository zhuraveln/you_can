import express from 'express'
import * as HabbitController from '../controllers/habbitController.js'
import checkAuth from '../utils/checkAuth.js'
import handleValidationErrors from '../utils/handleValidationErrors.js'
import { habbitCreateValidation } from '../validation/habbit.js'

export const HabbitRouter = express.Router()

// Get All Habbits
HabbitRouter.get('/', HabbitController.getHabbits)

// Get All Trash Habbits
HabbitRouter.get('/random', HabbitController.getTrashHabbits)

// Create Habbit
HabbitRouter.post('/',
  // checkAuth,
  // habbitCreateValidation,
  // handleValidationErrors,
  HabbitController.createHabbit)

// Delete Habbit
HabbitRouter.delete('/:id',
  // checkAuth,
  HabbitController.deleteHabbit)

// Edit Habbit
HabbitRouter.patch('/edit/:id',
  // habbitCreateValidation,
  // handleValidationErrors,
  HabbitController.editHabbit)

// Day done Habbit
HabbitRouter.patch('/done/:id', HabbitController.doneHabbit)