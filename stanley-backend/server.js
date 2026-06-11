require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const usersRouter = require('./routes/users')
const eventsRouter = require('./routes/events')
const opportunitiesRouter = require('./routes/opportunities')
const postsRouter = require('./routes/posts')

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))

// Routes
app.use('/api/users', usersRouter)
app.use('/api/events', eventsRouter)
app.use('/api/opportunities', opportunitiesRouter)
app.use('/api/posts', postsRouter)

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Stanley Backend running' })
})

// Connect to MongoDB then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas')
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message)
    process.exit(1)
  })
