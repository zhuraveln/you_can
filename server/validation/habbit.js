import { body } from 'express-validator'

export const habbitCreateValidation = [
  body('title', 'Min 3 symbols in title').isLength({ min: 3 }),
  body('type')
]