import express from 'express'
import { signUpValidation, signInValidation } from '../validation/auth.js'
import * as UserController from '../controllers/AuthController.js'
import checkAuth from '../utils/checkAuth.js'
import handleValidationErrors from '../utils/handleValidationErrors.js'

export const AuthRouter = express.Router()

// Sign Up
AuthRouter.post('/auth/sign-up', signUpValidation, handleValidationErrors, UserController.signUp)

// Sign In
AuthRouter.post('/auth/sign-in', signInValidation, handleValidationErrors, UserController.signIn)

// Authorization
AuthRouter.get('/auth/me', checkAuth, UserController.authMe)