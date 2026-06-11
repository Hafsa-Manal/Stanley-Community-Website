const express = require('express')
const router = express.Router()
const Event = require('../models/Event')
const User = require('../models/User')
const { verifyToken, requireAdmin } = require('../middleware/auth')

// Get all events
router.get('/', verifyToken, async (req, res) => {
  try {
    const { category, search } = req.query
    let query = {}
    if (category) query.category = category
    if (search) query.title = { $regex: search, $options: 'i' }
    const events = await Event.find(query).sort({ date: 1 }).populate('createdBy', 'name email')
    res.json(events)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get single event
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'name email')
    if (!event) return res.status(404).json({ error: 'Event not found' })
    res.json(event)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Create event (admin only)
router.post('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { title, description, category, image, link, date, location, organizer } = req.body
    const event = await Event.create({
      title, description, category, image, link, date, location, organizer,
      createdBy: req.user.dbId
    })
    res.status(201).json(event)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update event (admin only)
router.put('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!event) return res.status(404).json({ error: 'Event not found' })
    res.json(event)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete event (admin only)
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id)
    res.json({ message: 'Event deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Student joins event
router.post('/:id/join', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })
    if (!user) return res.status(404).json({ error: 'User not found' })

    if (user.joinedEvents.includes(req.params.id)) {
      return res.status(400).json({ error: 'Already joined' })
    }

    user.joinedEvents.push(req.params.id)
    await user.save()
    res.json({ message: 'Event added to your list' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Student leaves event
router.delete('/:id/join', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })
    user.joinedEvents = user.joinedEvents.filter(e => e.toString() !== req.params.id)
    await user.save()
    res.json({ message: 'Event removed from your list' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
