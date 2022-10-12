import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import User from '../models/user.js'

export const signUp = async (req, res) => {
  try {

    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const doc = new User({
      email: req.body.email,
      name: req.body.name,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash
    })

    const user = await doc.save()

    const token = jwt.sign({
      _id: user._id,
    }, 'secretkey', { expiresIn: '7d' })

    const { passwordHash, ...userData } = user._doc

    res.json({
      ...userData,
      token,
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Failed to Sign up'
    })
  }
}

export const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(404).json({
        message: 'Wrong login or password'
      })
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash)

    if (!isValidPassword) {
      return res.status(400).json({
        message: 'Wrong login or password'
      })
    }

    const token = jwt.sign({
      _id: user._id,
    }, 'secretkey', { expiresIn: '7d' })

    const { passwordHash, ...userData } = user._doc

    res.json({
      ...userData,
      token,
    })

  } catch (error) {
    console.log(error)
    res.status(400).json({
      message: 'Failed to Sign in'
    })
  }
}

export const authMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId)

    if (!user) {
      res.status(404).json({
        message: 'User is not found'
      })
    }

    const { passwordHash, ...userData } = user._doc

    res.status(200).json({ userData })

  } catch (error) {
    console.log(error)
    res.status(403).json({
      message: 'No access'
    })
  }
}