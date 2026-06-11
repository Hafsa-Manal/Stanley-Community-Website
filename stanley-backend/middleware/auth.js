const admin = require('../config/firebase')
const User = require('../models/User')

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = authHeader.split('Bearer ')[1]

  try {
    const decoded = await admin.auth().verifyIdToken(token)
    req.user = decoded

    // Attach role from MongoDB
    const dbUser = await User.findOne({ email: decoded.email })
    if (dbUser) {
      req.user.role = dbUser.role
      req.user.dbId = dbUser._id
    } else {
      req.user.role = 'student'
    }

    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' })
  }
  next()
}

module.exports = { verifyToken, requireAdmin }
