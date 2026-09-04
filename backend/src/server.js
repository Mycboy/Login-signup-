const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const orderRoutes = require('./routes/orderRoutes')
const productRoutes = require('./routes/productRoutes')
const adminRoutes = require('./routes/adminRoutes')

const app = express()

app.use(cors())
app.use(express.json())

const mongoose = require('mongoose')

connectDB()

app.get('/', (req, res) => {
  res.json({
    message: 'Backend is running successfully',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting'
  })
})

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting',
    timestamp: new Date().toISOString()
  })
})

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'connecting',
    timestamp: new Date().toISOString()
  })
})

// Support both /api/* and root paths for maximum compatibility
app.use('/api/auth', authRoutes)
app.use('/auth', authRoutes)
app.use('/api/orders', orderRoutes)
app.use('/orders', orderRoutes)
app.use('/api/products', productRoutes)
app.use('/products', productRoutes)
app.use('/api/admin', adminRoutes)
app.use('/admin', adminRoutes)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: err.message || 'Server error' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
