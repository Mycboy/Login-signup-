const mongoose = require('mongoose')
const dns = require('dns')
const { seedProducts, seedAdmin } = require('../seedProducts')

try {
  dns.setServers(['8.8.8.8', '8.8.4.4'])
} catch {
  // fallback to system default
}

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pokevault'
    const conn = await mongoose.connect(mongoUri)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
    await seedProducts()
    await seedAdmin()
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    console.error('Please verify MONGO_URI in your environment variables.')
  }
}

module.exports = connectDB
