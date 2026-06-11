const express = require('express')
const router = express.Router()
const CommunityPost = require('../models/CommunityPost')
const { verifyToken } = require('../middleware/auth')

// Get all posts
router.get('/', verifyToken, async (req, res) => {
  try {
    const { category, search, sort } = req.query
    let query = {}
    if (category) query.category = category
    if (search) query.title = { $regex: search, $options: 'i' }

    let sortOption = { createdAt: -1 }
    if (sort === 'top') sortOption = { upvotes: -1 }

    const posts = await CommunityPost.find(query).sort(sortOption).populate('author', 'name email')
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get single post
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id).populate('author', 'name email')
    if (!post) return res.status(404).json({ error: 'Post not found' })
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Create post
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, content, category } = req.body
    const post = await CommunityPost.create({
      title, content, category,
      author: req.user.dbId,
      authorName: req.user.name || req.user.email
    })
    res.status(201).json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete post (author or admin)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id)
    if (!post) return res.status(404).json({ error: 'Post not found' })

    const isOwner = post.author.toString() === req.user.dbId?.toString()
    const isAdmin = req.user.role === 'admin'
    if (!isOwner && !isAdmin) return res.status(403).json({ error: 'Not allowed' })

    await post.deleteOne()
    res.json({ message: 'Post deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Upvote / downvote
router.post('/:id/vote', verifyToken, async (req, res) => {
  try {
    const { type } = req.body // 'up' or 'down'
    const post = await CommunityPost.findById(req.params.id)
    if (!post) return res.status(404).json({ error: 'Post not found' })

    const userId = req.user.dbId

    if (type === 'up') {
      post.downvotes.pull(userId)
      if (post.upvotes.includes(userId)) {
        post.upvotes.pull(userId) // toggle off
      } else {
        post.upvotes.push(userId)
      }
    } else if (type === 'down') {
      post.upvotes.pull(userId)
      if (post.downvotes.includes(userId)) {
        post.downvotes.pull(userId) // toggle off
      } else {
        post.downvotes.push(userId)
      }
    }

    await post.save()
    res.json({ upvotes: post.upvotes.length, downvotes: post.downvotes.length })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Add comment
router.post('/:id/comments', verifyToken, async (req, res) => {
  try {
    const { content } = req.body
    if (!content?.trim()) return res.status(400).json({ error: 'Comment cannot be empty' })

    const post = await CommunityPost.findById(req.params.id)
    if (!post) return res.status(404).json({ error: 'Post not found' })

    post.comments.push({
      content,
      author: req.user.dbId,
      authorName: req.user.name || req.user.email
    })
    await post.save()
    res.status(201).json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete comment (author or admin)
router.delete('/:id/comments/:commentId', verifyToken, async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id)
    if (!post) return res.status(404).json({ error: 'Post not found' })

    const comment = post.comments.id(req.params.commentId)
    if (!comment) return res.status(404).json({ error: 'Comment not found' })

    const isOwner = comment.author.toString() === req.user.dbId?.toString()
    const isAdmin = req.user.role === 'admin'
    if (!isOwner && !isAdmin) return res.status(403).json({ error: 'Not allowed' })

    comment.deleteOne()
    await post.save()
    res.json({ message: 'Comment deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
