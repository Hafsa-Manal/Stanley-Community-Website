const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['Academic', 'Clubs', 'Workshops', 'Hackathons', 'Placements', 'Sports', 'Cultural', 'Competitions', 'Other'],
    required: true
  },
  image: { type: String, default: '' },
  link: { type: String, default: '' },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true })

module.exports = mongoose.model('Event', eventSchema)
