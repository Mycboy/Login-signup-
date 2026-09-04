const express = require('express')
const mongoose = require('mongoose')
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

    const findProductForItem = async (item) => {
      const productId = item.productId || item.id
      if (productId && mongoose.isValidObjectId(productId)) {
        const found = await Product.findById(productId)
        if (found) return found
      }
      if (item.name) {
        return await Product.findOne({ name: item.name })
      }
      return null
    }

    for (const item of items) {
      const quantity = Number(item.quantity) || 0
      if (quantity <= 0) continue

      const product = await findProductForItem(item)
      if (!product) continue

      if (quantity > product.stock) {
        return res.status(400).json({ message: `Only ${product.stock} units available for ${product.name}.` })
      }
    }

    const stockUpdates = await Promise.all(
      items.map(async (item) => {
        const quantity = Number(item.quantity) || 0
        if (quantity <= 0) return null

        const product = await findProductForItem(item)
        if (!product) return null

        product.stock = Math.max(0, product.stock - quantity)
        await product.save()
        return product
      })
    )

    const orderNumber = req.body.id || req.body.orderNumber || `PKV-${Date.now()}`

    const order = await Order.create({
      ...req.body,
      user: req.user._id,
      orderNumber,
      items: items.map((item) => ({
        ...item,
        id: item.productId || item.id,
        productId: item.productId || item.id
      }))
    })

    const orderObj = order.toObject()
    res.status(201).json({
      ...orderObj,
      id: orderObj.orderNumber || orderObj._id,
      stockUpdated: stockUpdates.filter(Boolean).length
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
