const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { verifyToken } = require('../middleware/auth')

const ADMIN_EMAILS = ['lanamhafsa@gmail.com', 'aarifah1231@gmail.com']

// Create or fetch user on first login
router.post('/sync', verifyToken, async (req, res) => {
  try {
    const { email, name } = req.user
    let user = await User.findOne({ email })

    if (!user) {
      user = await User.create({
        email,
        name: name || '',
        role: ADMIN_EMAILS.includes(email) ? 'admin' : 'student'
      })
    }

    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get current user profile
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).populate('joinedEvents')
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update profile
router.put('/me', verifyToken, async (req, res) => {
  try {
    const { name, branch, rollNo, githubUsername, linkedinUsername, profilePicture } = req.body
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { name, branch, rollNo, githubUsername, linkedinUsername, profilePicture },
      { new: true }
    )
    res.json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
