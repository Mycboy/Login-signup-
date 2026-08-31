const express = require('express')
const Order = require('../models/order')
const Product = require('../models/product')
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
    const items = Array.isArray(req.body.items) ? req.body.items : []

    for (const item of items) {
      const productId = item.productId || item.id
      const quantity = Number(item.quantity) || 0

      if (!productId || quantity <= 0) {
        continue
      }

      const product = await Product.findById(productId)
      if (!product) {
        return res.status(400).json({ message: 'One or more products could not be found.' })
      }

      if (quantity > product.stock) {
        return res.status(400).json({ message: `Only ${product.stock} units available for ${product.name}.` })
      }
    }

    const stockUpdates = await Promise.all(
      items.map(async (item) => {
        const productId = item.productId || item.id
        const quantity = Number(item.quantity) || 0

        if (!productId || quantity <= 0) {
          return null
        }

        const product = await Product.findById(productId)
        if (!product) {
          return null
        }

        product.stock = Math.max(0, product.stock - quantity)
        await product.save()
        return product
      })
    )

    const order = await Order.create({
      ...req.body,
      user: req.user._id,
      items: items.map((item) => ({
        ...item,
        id: item.productId || item.id,
        productId: item.productId || item.id
      }))
    })

    res.status(201).json({ ...order.toObject(), stockUpdated: stockUpdates.filter(Boolean).length })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
