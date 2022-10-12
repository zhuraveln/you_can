import { body } from 'express-validator'

export const signUpValidation = [
  body('email', 'Incorrect Email').isEmail(),
  body('password', 'Min 5 symbols in Password').isLength({ min: 5 }),
  body('name', 'Min 3 symbols in Name').isLength({ min: 3 }),
  body('avatarUrl', 'Incorrect url for Avatar').optional().isURL(),
]

export const signInValidation = [
  body('email', 'Incorrect Email').isEmail(),
  body('password', 'Min 5 symbols in Password').isLength({ min: 5 }),
]