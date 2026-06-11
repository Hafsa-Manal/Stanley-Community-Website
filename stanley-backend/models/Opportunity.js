const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  authorName: { type: String, default: '' }
}, { timestamps: true })

const opportunitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, default: '' },
  link: { type: String, default: '' },
  category: {
    type: String,
    enum: ['Internships', 'Job postings', 'Competitions / hackathons', 'Scholarships', 'Research openings', 'General announcements'],
    required: true
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  replies: [replySchema]
}, { timestamps: true })

module.exports = mongoose.model('Opportunity', opportunitySchema)
