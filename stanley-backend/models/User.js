const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  branch: { type: String, default: '' },
  rollNo: { type: String, default: '' },
  githubUsername: { type: String, default: '' },
  linkedinUsername: { type: String, default: '' },
  profilePicture: { type: String, default: '' },
  joinedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
