require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const orderRoutes = require('./routes/orderRoutes')

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.get("/", (req, res) => {
    res.json({
        message: "Backend is running successfully"
    });
});

app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: err.message || 'Server error' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
