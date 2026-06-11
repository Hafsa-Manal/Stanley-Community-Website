const express = require('express')
const router = express.Router()
const Opportunity = require('../models/Opportunity')
const { verifyToken, requireAdmin } = require('../middleware/auth')

// Get all opportunities
router.get('/', verifyToken, async (req, res) => {
  try {
    const { category, search } = req.query
    let query = {}
    if (category) query.category = category
    if (search) query.title = { $regex: search, $options: 'i' }
    const opportunities = await Opportunity.find(query)
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email')
    res.json(opportunities)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get single opportunity
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const opp = await Opportunity.findById(req.params.id).populate('createdBy', 'name email')
    if (!opp) return res.status(404).json({ error: 'Opportunity not found' })
    res.json(opp)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Create opportunity (admin only)
router.post('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { title, content, image, link, category } = req.body
    const opp = await Opportunity.create({
      title, content, image, link, category,
      createdBy: req.user.dbId
    })
    res.status(201).json(opp)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update opportunity (admin only)
router.put('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const opp = await Opportunity.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!opp) return res.status(404).json({ error: 'Opportunity not found' })
    res.json(opp)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete opportunity (admin only)
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    await Opportunity.findByIdAndDelete(req.params.id)
    res.json({ message: 'Opportunity deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Add reply (any logged in user)
router.post('/:id/replies', verifyToken, async (req, res) => {
  try {
    const { content } = req.body
    if (!content?.trim()) return res.status(400).json({ error: 'Reply cannot be empty' })

    const opp = await Opportunity.findById(req.params.id)
    if (!opp) return res.status(404).json({ error: 'Opportunity not found' })

    opp.replies.push({
      content,
      author: req.user.dbId,
      authorName: req.user.name || req.user.email
    })
    await opp.save()
    res.status(201).json(opp)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete reply (author or admin)
router.delete('/:id/replies/:replyId', verifyToken, async (req, res) => {
  try {
    const opp = await Opportunity.findById(req.params.id)
    if (!opp) return res.status(404).json({ error: 'Opportunity not found' })

    const reply = opp.replies.id(req.params.replyId)
    if (!reply) return res.status(404).json({ error: 'Reply not found' })

    const isOwner = reply.author.toString() === req.user.dbId?.toString()
    const isAdmin = req.user.role === 'admin'
    if (!isOwner && !isAdmin) return res.status(403).json({ error: 'Not allowed' })

    reply.deleteOne()
    await opp.save()
    res.json({ message: 'Reply deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
