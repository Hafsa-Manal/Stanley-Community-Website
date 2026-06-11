import { useState } from 'react'

const MOCK_USER = {
  name: 'Hafsa Manal',
  email: 'hafsa@stanley.edu.in',
  branch: 'Computer Science Engineering',
  rollNo: '22CSE045',
  githubUsername: 'hafsacanal',
  linkedinUsername: 'hafsa-manal',
  profilePicture: '',
  role: 'student',
  joinedEvents: [
    {
      _id: '1',
      title: 'National Level Technical Symposium — INNOVATE 2025',
      category: 'Academic',
      date: '2025-04-15T09:00:00Z',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80',
    },
    {
      _id: '2',
      title: 'Hackathon 36 — Build for Impact',
      category: 'Hackathons',
      date: '2025-04-22T08:00:00Z',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80',
    },
    {
      _id: '3',
      title: 'Resume Building & LinkedIn Workshop',
      category: 'Workshops',
      date: '2025-04-10T10:00:00Z',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
    },
  ],
}

const MOCK_ACTIVITY = {
  postsCreated: 4,
  commentsPosted: 12,
  upvotesReceived: 38,
}

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
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function Profile() {
  const [user, setUser] = useState(MOCK_USER)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ ...MOCK_USER })
  const [activeTab, setActiveTab] = useState('events')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setUser({ ...form })
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const initials = user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'S'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero banner */}
      <div className="bg-gradient-to-r from-[#C41E2A] to-[#9B1520] h-36" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile card overlapping hero */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 -mt-16 p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative shrink-0">
              {user.profilePicture ? (
                <img src={user.profilePicture} alt={user.name} className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md" />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-[#C41E2A] flex items-center justify-center border-4 border-white shadow-md">
                  <span className="text-3xl font-black text-white">{initials}</span>
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white bg-green-400" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h1 className="text-2xl font-black text-gray-900">{user.name}</h1>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">{user.branch}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">Roll No: {user.rollNo}</span>
                    {user.role === 'admin' && (
                      <span className="text-xs bg-[#C41E2A] text-white px-2.5 py-1 rounded-full font-semibold">Admin</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => { setEditing(!editing); setForm({ ...user }) }}
                  className={`text-sm font-semibold px-4 py-2 rounded-xl transition ${editing ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-[#C41E2A] text-white hover:bg-[#9B1520]'}`}
                >
                  {editing ? 'Cancel' : '✏️ Edit Profile'}
                </button>
              </div>

              {!editing && (
                <div className="flex gap-3 mt-3 flex-wrap">
                  {user.githubUsername && (
                    <a href={`https://github.com/${user.githubUsername}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg transition font-medium">
                      ⌥ {user.githubUsername}
                    </a>
                  )}
                  {user.linkedinUsername && (
                    <a href={`https://linkedin.com/in/${user.linkedinUsername}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition font-medium">
                      in {user.linkedinUsername}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Edit form */}
          {editing && (
            <div className="mt-6 pt-5 border-t border-gray-100">
              {saved && (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-2.5 text-sm mb-4">
                  ✅ Profile updated successfully!
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Full Name', key: 'name', placeholder: 'Your full name' },
                  { label: 'Branch / Class', key: 'branch', placeholder: 'e.g. Computer Science Engineering' },
                  { label: 'Roll Number', key: 'rollNo', placeholder: 'e.g. 22CSE045' },
                  { label: 'Profile Picture URL', key: 'profilePicture', placeholder: 'https://...' },
                  { label: 'GitHub Username', key: 'githubUsername', placeholder: 'your-username' },
                  { label: 'LinkedIn Username', key: 'linkedinUsername', placeholder: 'your-username' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{field.label}</label>
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={form[field.key]}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E2A] bg-gray-50"
                    />
                  </div>
                ))}
              </div>
              <button onClick={handleSave} className="mt-4 bg-[#C41E2A] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#9B1520] transition text-sm">
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Activity stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Posts Created', value: MOCK_ACTIVITY.postsCreated, icon: '📝' },
            { label: 'Comments Posted', value: MOCK_ACTIVITY.commentsPosted, icon: '💬' },
            { label: 'Upvotes Received', value: MOCK_ACTIVITY.upvotesReceived, icon: '⬆️' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-black text-[#C41E2A]">{stat.value}</div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          <div className="flex border-b border-gray-100">
            {[
              { key: 'events', label: `My Events (${user.joinedEvents.length})` },
              { key: 'activity', label: 'Recent Activity' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-4 text-sm font-semibold transition ${
                  activeTab === tab.key
                    ? 'text-[#C41E2A] border-b-2 border-[#C41E2A] bg-red-50/50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'events' && (
              user.joinedEvents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-3">📅</div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-1">No events yet</h3>
                  <p className="text-gray-400 text-sm">Browse events and add them to your list!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.joinedEvents.map(event => (
                    <div key={event._id} className="rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition group">
                      <div className="relative h-32 overflow-hidden">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[event.category] || 'bg-gray-100 text-gray-700'}`}>
                          {event.category}
                        </span>
                      </div>
                      <div className="p-3">
                        <h4 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 mb-1">{event.title}</h4>
                        <p className="text-xs text-gray-500">📅 {formatDate(event.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {activeTab === 'activity' && (
              <div className="space-y-3">
                {[
                  { type: 'post', text: 'Created a post in Placements — "Tips for cracking TCS NQT"', time: '2 days ago' },
                  { type: 'comment', text: 'Commented on "DBMS study group Saturday"', time: '3 days ago' },
                  { type: 'upvote', text: 'Your post received 12 upvotes', time: '4 days ago' },
                  { type: 'post', text: 'Created a post in Coding — "Resources for DSA prep"', time: '5 days ago' },
                  { type: 'comment', text: 'Commented on "Canteen meal prices petition"', time: '6 days ago' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 ${
                      item.type === 'post' ? 'bg-red-100' : item.type === 'comment' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      {item.type === 'post' ? '📝' : item.type === 'comment' ? '💬' : '⬆️'}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{item.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
