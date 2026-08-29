const express = require('express')
const User = require('../models/user')
const Product = require('../models/product')
const Order = require('../models/order')
const { protect, adminOnly } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/overview', protect, adminOnly, async (req, res) => {
  try {
    const [totalUsers, totalProducts, totalOrders, revenueResult] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: '$total' } } }
      ])
    ])

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      revenue: revenueResult[0]?.totalRevenue || 0
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put('/users/:id/role', protect, adminOnly, async (req, res) => {
  try {
    const { role } = req.body
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password')

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete('/users/:id', protect, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'User deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/products', protect, adminOnly, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/products', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put('/products/:id', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete('/products/:id', protect, adminOnly, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/orders', protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('user', 'name email')
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put('/orders/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true })
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
