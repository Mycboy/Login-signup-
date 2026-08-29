const jwt = require('jsonwebtoken')
const User = require('../models/user')

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role || 'user'
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = await User.create({ name, email, password })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user)
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user)
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { signup, login }
