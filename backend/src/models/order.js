const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    customerName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    },
    paymentMethod: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      default: 'Confirmed'
    },
    items: [
      {
        id: String,
        name: String,
        price: Number,
        quantity: Number,
        rarity: String,
        image: String
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
