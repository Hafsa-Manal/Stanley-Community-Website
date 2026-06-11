import { useState } from 'react'

const CATEGORIES = [
  'All',
  'Internships',
  'Job postings',
  'Competitions / hackathons',
  'Scholarships',
  'Research openings',
  'General announcements',
]

const MOCK_OPPORTUNITIES = [
  {
    _id: '1',
    title: 'Google Summer of Code 2025 — Applications Open',
    content: 'Google Summer of Code is a global program focused on bringing more developers into open source software development. Students work with an open source organization on a 12+ week programming project. Stipend ranges from $1500–$3300 depending on country.',
    category: 'Internships',
    image: '',
    link: 'https://summerofcode.withgoogle.com/',
    createdBy: { name: 'Admin' },
    createdAt: '2025-03-10T10:00:00Z',
    replies: [
      { _id: 'r1', authorName: 'Priya S', content: 'Applied last year, highly recommend it!', createdAt: '2025-03-11T09:00:00Z' },
      { _id: 'r2', authorName: 'Meera R', content: 'What GPA is required?', createdAt: '2025-03-11T10:00:00Z' },
    ]
  },
  {
    _id: '2',
    title: 'TCS Smart Hiring Drive — 2025 Batch',
    content: 'TCS is conducting a campus hiring drive for 2025 graduating students. Roles available: Software Engineer, Business Analyst, Data Analyst. Package: 3.5–7 LPA based on role. Register before March 30th on the TCS NextStep portal.',
    category: 'Job postings',
    image: '',
    link: '',
    createdBy: { name: 'Admin' },
    createdAt: '2025-03-08T08:00:00Z',
    replies: [
      { _id: 'r3', authorName: 'Lakshmi K', content: 'Is this for CSE only or all branches?', createdAt: '2025-03-09T11:00:00Z' },
    ]
  },
  {
    _id: '3',
    title: 'Smart India Hackathon 2025 — Internal Registration',
    content: 'SIH 2025 internal registrations are now open. Teams of 6 students. Problem statements across agriculture, health, education, and smart cities. Last date for internal registration: April 5th. Contact your department coordinator to register.',
    category: 'Competitions / hackathons',
    image: '',
    link: '',
    createdBy: { name: 'Admin' },
    createdAt: '2025-03-05T09:00:00Z',
    replies: []
  },
  {
    _id: '4',
    title: 'AICTE Pragati Scholarship for Girls — 2025',
    content: 'AICTE Pragati Scholarship provides financial assistance of Rs. 50,000/- per annum to girl students pursuing technical education. Eligibility: First year students with family income below 8 LPA. Apply through the National Scholarship Portal before April 15.',
    category: 'Scholarships',
    image: '',
    link: 'https://scholarships.gov.in',
    createdBy: { name: 'Admin' },
    createdAt: '2025-03-01T07:00:00Z',
    replies: [
      { _id: 'r4', authorName: 'Divya M', content: 'Can second year students also apply?', createdAt: '2025-03-02T08:00:00Z' },
      { _id: 'r5', authorName: 'Sneha P', content: 'Applied! The portal is easy to use.', createdAt: '2025-03-03T10:00:00Z' },
    ]
  },
  {
    _id: '5',
    title: 'Research Internship — IIT Madras AI Lab',
    content: 'IIT Madras AI Lab is offering summer research internships for undergraduate students interested in Machine Learning and Computer Vision. Duration: 8 weeks (May–June). Stipend: Rs. 10,000/month. Apply with your resume and a 1-page SOP.',
    category: 'Research openings',
    image: '',
    link: '',
    createdBy: { name: 'Admin' },
    createdAt: '2025-02-28T06:00:00Z',
    replies: []
  },
]

const CATEGORY_COLORS = {
  'Internships': 'bg-blue-100 text-blue-700',
  'Job postings': 'bg-green-100 text-green-700',
  'Competitions / hackathons': 'bg-purple-100 text-purple-700',
  'Scholarships': 'bg-yellow-100 text-yellow-700',
  'Research openings': 'bg-orange-100 text-orange-700',
  'General announcements': 'bg-gray-100 text-gray-700',
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return `${days} days ago`
}

function OpportunityCard({ opp, isAdmin, onReply }) {
  const [showReplies, setShowReplies] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [showReplyBox, setShowReplyBox] = useState(false)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[opp.category] || 'bg-gray-100 text-gray-700'}`}>
                {opp.category}
              </span>
              <span className="text-xs text-gray-400">{timeAgo(opp.createdAt)}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 leading-snug">{opp.title}</h3>
          </div>
          {isAdmin && (
            <div className="flex gap-2 shrink-0">
              <button className="text-xs text-gray-500 hover:text-blue-600 px-2 py-1 rounded-lg hover:bg-blue-50 transition">Edit</button>
              <button className="text-xs text-gray-500 hover:text-red-600 px-2 py-1 rounded-lg hover:bg-red-50 transition">Delete</button>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">{opp.content}</p>

        {opp.link && (
          <a
            href={opp.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[#C41E2A] font-medium hover:underline mb-4"
          >
            🔗 View Opportunity
          </a>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#C41E2A] flex items-center justify-center text-white text-xs font-bold">
              {opp.createdBy?.name?.charAt(0) || 'A'}
            </div>
            <span className="text-xs text-gray-500">Posted by <span className="font-medium text-gray-700">{opp.createdBy?.name || 'Admin'}</span></span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="text-xs text-gray-500 hover:text-[#C41E2A] transition flex items-center gap-1"
            >
              💬 {opp.replies.length} {opp.replies.length === 1 ? 'reply' : 'replies'}
            </button>
            <button
              onClick={() => { setShowReplyBox(!showReplyBox); setShowReplies(true) }}
              className="text-xs bg-[#C41E2A] text-white px-3 py-1.5 rounded-lg hover:bg-[#9B1520] transition font-medium"
            >
              Reply
            </button>
          </div>
        </div>
      </div>

      {/* Replies section */}
      {showReplies && (
        <div className="bg-gray-50 border-t border-gray-100 px-6 py-4 space-y-3">
          {opp.replies.length === 0 && !showReplyBox && (
            <p className="text-xs text-gray-400 text-center py-2">No replies yet. Be the first!</p>
          )}
          {opp.replies.map(reply => (
            <div key={reply._id} className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs font-bold shrink-0">
                {reply.authorName?.charAt(0) || 'S'}
              </div>
              <div className="flex-1 bg-white rounded-xl px-4 py-2.5 border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-gray-800">{reply.authorName}</span>
                  <span className="text-xs text-gray-400">{timeAgo(reply.createdAt)}</span>
                </div>
                <p className="text-sm text-gray-600">{reply.content}</p>
              </div>
            </div>
          ))}

          {/* Reply box */}
          {showReplyBox && (
            <div className="flex gap-3 pt-1">
              <div className="w-7 h-7 rounded-full bg-[#C41E2A] flex items-center justify-center text-white text-xs font-bold shrink-0">
                Y
              </div>
              <div className="flex-1">
                <textarea
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Write your reply..."
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E2A] resize-none bg-white"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => { onReply(opp._id, replyText); setReplyText(''); setShowReplyBox(false) }}
                    className="text-xs bg-[#C41E2A] text-white px-3 py-1.5 rounded-lg hover:bg-[#9B1520] transition font-medium"
                  >
                    Post Reply
                  </button>
                  <button
                    onClick={() => { setShowReplyBox(false); setReplyText('') }}
                    className="text-xs text-gray-500 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const isAdmin = false // will come from useAuth later
  const [opportunities, setOpportunities] = useState(MOCK_OPPORTUNITIES)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const filtered = opportunities.filter(o => {
    const matchCat = selectedCategory === 'All' || o.category === selectedCategory
    const matchSearch = o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.content.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const handleReply = (oppId, text) => {
    if (!text.trim()) return
    setOpportunities(prev => prev.map(o =>
      o._id === oppId
        ? { ...o, replies: [...o.replies, { _id: Date.now().toString(), authorName: 'You', content: text, createdAt: new Date().toISOString() }] }
        : o
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero banner */}
      <div className="bg-gradient-to-r from-[#C41E2A] to-[#9B1520] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-black mb-1">Opportunities</h1>
              <p className="text-red-100 text-sm">Internships, jobs, scholarships and more — curated for Stanley students</p>
            </div>
            {isAdmin && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-white text-[#C41E2A] font-bold px-5 py-2.5 rounded-xl hover:bg-red-50 transition shadow-lg text-sm"
              >
                + Post Opportunity
              </button>
            )}
          </div>

          {/* Search bar */}
          <div className="mt-6">
            <div className="relative max-w-xl">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-300">🔍</span>
              <input
                type="text"
                placeholder="Search opportunities..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20  border border-white/30 text-white placeholder-red-200 focus:outline-none focus:bg-white/30 transition text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category filters */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
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

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-800">{filtered.length}</span> opportunities
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">No opportunities found</h3>
            <p className="text-gray-400 text-sm">Try a different category or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filtered.map(opp => (
              <OpportunityCard
                key={opp._id}
                opp={opp}
                isAdmin={isAdmin}
                onReply={handleReply}
              />
            ))}
          </div>
        )}
      </div>

      {/* Admin create modal placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Post New Opportunity</h2>
            <div className="space-y-3">
              <input placeholder="Title" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E2A]" />
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E2A]">
                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
              </select>
              <textarea placeholder="Content / Description" rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E2A] resize-none" />
              <input placeholder="External link (optional)" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E2A]" />
              <input placeholder="Image URL (optional)" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E2A]" />
            </div>
            <div className="flex gap-3 mt-5">
              <button className="flex-1 py-3 bg-[#C41E2A] text-white rounded-xl font-semibold hover:bg-[#9B1520] transition text-sm">Post</button>
              <button onClick={() => setShowCreateModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
