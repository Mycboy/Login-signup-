const express = require('express')
const Order = require('../models/order')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', protect, async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      user: req.user._id
    })

    res.status(201).json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
