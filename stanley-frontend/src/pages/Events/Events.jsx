import { useState } from 'react'

const CATEGORIES = ['All', 'Academic', 'Clubs', 'Workshops', 'Hackathons', 'Placements', 'Sports', 'Cultural', 'Competitions', 'Other']

const MOCK_EVENTS = [
  {
    _id: '1',
    title: 'National Level Technical Symposium — INNOVATE 2025',
    description: 'A two-day national level technical symposium featuring paper presentations, project expo, coding contests and workshops. Open to all UG and PG students across India.',
    category: 'Academic',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    date: '2025-04-15T09:00:00Z',
    location: 'Stanley College Main Auditorium',
    organizer: 'Department of CSE',
    link: '',
    createdBy: { name: 'Admin' },
  },
  {
    _id: '2',
    title: 'Hackathon 36 — Build for Impact',
    description: '36-hour non-stop hackathon focused on building solutions for social good. Teams of 3–4. Problem statements released at the start. Cash prizes worth ₹50,000.',
    category: 'Hackathons',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
    date: '2026-08-22T08:00:00Z',
    location: 'CSE Lab Block',
    organizer: 'Coding Club',
    link: 'https://unstop.com',
    createdBy: { name: 'Admin' },
  },
  {
    _id: '3',
    title: 'Resume Building & LinkedIn Workshop',
    description: 'An interactive session on crafting the perfect resume and building a strong LinkedIn profile. Industry experts will give live feedback on your resumes.',
    category: 'Workshops',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
    date: '2025-04-10T10:00:00Z',
    location: 'Seminar Hall 1',
    organizer: 'Placement Cell',
    link: '',
    createdBy: { name: 'Admin' },
  },
  {
    _id: '4',
    title: 'Inter-College Throwball Championship',
    description: 'Annual inter-college throwball championship. Stanley teams compete against 12 colleges from Chennai. Come cheer for our teams!',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
    date: '2025-04-18T08:30:00Z',
    location: 'Stanley Sports Ground',
    organizer: 'Physical Education Dept',
    link: '',
    createdBy: { name: 'Admin' },
  },
  {
    _id: '5',
    title: 'Freshers Day Celebration — Nalangu 2025',
    description: 'Welcome freshers to the Stanley family! A full day of cultural events, performances, games and fun. All seniors are invited to attend and support the new batch.',
    category: 'Cultural',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
    date: '2025-04-25T09:00:00Z',
    location: 'Open Air Theatre',
    organizer: 'Student Council',
    link: '',
    createdBy: { name: 'Admin' },
  },
  {
    _id: '6',
    title: 'TCS & Wipro Pre-Placement Talk',
    description: 'Representatives from TCS and Wipro will walk through their hiring process, roles, and what they look for in candidates. Mandatory for final year students.',
    category: 'Placements',
    image: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=600&q=80',
    date: '2025-04-12T11:00:00Z',
    location: 'Seminar Hall 2',
    organizer: 'Placement Cell',
    link: '',
    createdBy: { name: 'Admin' },
  },
]

const CATEGORY_COLORS = {
  'Academic': 'bg-blue-100 text-blue-700',
  'Clubs': 'bg-pink-100 text-pink-700',
  'Workshops': 'bg-purple-100 text-purple-700',
  'Hackathons': 'bg-orange-100 text-orange-700',
  'Placements': 'bg-green-100 text-green-700',
  'Sports': 'bg-yellow-100 text-yellow-700',
  'Cultural': 'bg-rose-100 text-rose-700',
  'Competitions': 'bg-indigo-100 text-indigo-700',
  'Other': 'bg-gray-100 text-gray-700',
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return {
    day: d.getDate(),
    month: d.toLocaleString('default', { month: 'short' }),
    time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    full: d.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
  }
}

function EventCard({ event, isAdmin, joinedEvents, onJoin, onRemove }) {
  const date = formatDate(event.date)
  const isJoined = joinedEvents.includes(event._id)
  const isPast = new Date(event.date) < new Date()

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[event.category] || 'bg-gray-100 text-gray-700'}`}>
            {event.category}
          </span>
        </div>

        {/* Past badge */}
        {isPast && (
          <div className="absolute top-3 right-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/60 text-white">
              Past Event
            </span>
          </div>
        )}

        {/* Date box */}
        <div className="absolute bottom-3 right-3 bg-white rounded-xl px-3 py-1.5 text-center shadow-lg">
          <div className="text-lg font-black text-[#C41E2A] leading-none">{date.day}</div>
          <div className="text-xs font-semibold text-gray-600 uppercase">{date.month}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 line-clamp-2">{event.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{event.description}</p>

        {/* Meta info */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>🕐</span>
            <span>{date.full} · {date.time}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>📍</span>
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>👤</span>
            <span>{event.organizer}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
          {event.link && (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-xs text-[#C41E2A] font-medium border border-[#C41E2A] px-3 py-2 rounded-xl hover:bg-red-50 transition"
            >
              🔗 View Details
            </a>
          )}

          {isAdmin ? (
            <div className="flex gap-2 flex-1">
              <button className="flex-1 text-xs text-blue-600 border border-blue-200 px-3 py-2 rounded-xl hover:bg-blue-50 transition font-medium">
                Edit
              </button>
              <button className="flex-1 text-xs text-red-600 border border-red-200 px-3 py-2 rounded-xl hover:bg-red-50 transition font-medium">
                Delete
              </button>
            </div>
          ) : (
            <button
              onClick={() => isJoined ? onRemove(event._id) : onJoin(event._id)}
              disabled={isPast}
              className={`flex-1 text-xs font-semibold px-3 py-2 rounded-xl transition ${
                isPast
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : isJoined
                  ? 'bg-green-100 text-green-700 hover:bg-red-50 hover:text-red-600 border border-green-200'
                  : 'bg-[#C41E2A] text-white hover:bg-[#9B1520]'
              }`}
            >
              {isPast ? 'Event Ended' : isJoined ? '✓ Added · Remove' : '+ Add to My Events'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Events() {
  const isAdmin = false
  const [events] = useState(MOCK_EVENTS)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [joinedEvents, setJoinedEvents] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newEvent, setNewEvent] = useState({ title: '', description: '', category: 'Academic', date: '', location: '', organizer: '', link: '', image: '' })

  const filtered = events.filter(e => {
    const matchCat = selectedCategory === 'All' || e.category === selectedCategory
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const upcoming = filtered.filter(e => new Date(e.date) >= new Date())
  const past = filtered.filter(e => new Date(e.date) < new Date())

  const handleJoin = (id) => setJoinedEvents(prev => [...prev, id])
  const handleRemove = (id) => setJoinedEvents(prev => prev.filter(e => e !== id))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#C41E2A] to-[#9B1520] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-black mb-1">Events</h1>
              <p className="text-red-100 text-sm">Discover and save events happening at Stanley</p>
            </div>
            {isAdmin && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-white text-[#C41E2A] font-bold px-5 py-2.5 rounded-xl hover:bg-red-50 transition shadow-lg text-sm"
              >
                + Create Event
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-4 mt-6 flex-wrap">
            {[
              { label: 'Total Events', value: events.length },
              { label: 'Upcoming', value: events.filter(e => new Date(e.date) >= new Date()).length },
              { label: 'My Events', value: joinedEvents.length },
            ].map(s => (
              <div key={s.label} className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center min-w-[90px]">
                <div className="text-xl font-black">{s.value}</div>
                <div className="text-xs text-red-100">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="mt-5">
            <div className="relative max-w-xl">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-300">🔍</span>
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-red-200 focus:outline-none focus:bg-white/30 transition text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category filters */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#C41E2A] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Upcoming */}
        {upcoming.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C41E2A] inline-block"></span>
              Upcoming Events
              <span className="text-sm font-normal text-gray-400">({upcoming.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcoming.map(event => (
                <EventCard key={event._id} event={event} isAdmin={isAdmin} joinedEvents={joinedEvents} onJoin={handleJoin} onRemove={handleRemove} />
              ))}
            </div>
          </div>
        )}

        {/* Past */}
        {past.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-300 inline-block"></span>
              Past Events
              <span className="text-sm font-normal text-gray-400">({past.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 opacity-70">
              {past.map(event => (
                <EventCard key={event._id} event={event} isAdmin={isAdmin} joinedEvents={joinedEvents} onJoin={handleJoin} onRemove={handleRemove} />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">No events found</h3>
            <p className="text-gray-400 text-sm">Try a different category or search term</p>
          </div>
        )}
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Create New Event</h2>
            <div className="space-y-3">
              <input placeholder="Event Title" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E2A]" />
              <select value={newEvent.category} onChange={e => setNewEvent({...newEvent, category: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E2A]">
                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
              </select>
              <textarea placeholder="Description" rows={3} value={newEvent.description} onChange={e => setNewEvent({...newEvent, description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E2A] resize-none" />
              <input type="datetime-local" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E2A]" />
              <input placeholder="Location" value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E2A]" />
              <input placeholder="Organizer" value={newEvent.organizer} onChange={e => setNewEvent({...newEvent, organizer: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E2A]" />
              <input placeholder="External link (optional)" value={newEvent.link} onChange={e => setNewEvent({...newEvent, link: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E2A]" />
              <input placeholder="Image URL (optional)" value={newEvent.image} onChange={e => setNewEvent({...newEvent, image: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E2A]" />
            </div>
            <div className="flex gap-3 mt-5">
              <button className="flex-1 py-3 bg-[#C41E2A] text-white rounded-xl font-semibold hover:bg-[#9B1520] transition text-sm">Create Event</button>
              <button onClick={() => setShowCreateModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
