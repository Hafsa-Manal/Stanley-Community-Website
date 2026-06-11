import { useState } from 'react'

const CATEGORIES = ['All', 'Academics', 'Placements', 'Clubs', 'Coding', 'Projects', 'General', 'Help', 'Campus Life']

const MOCK_POSTS = [
  {
    _id: '1',
    title: 'Tips for cracking TCS NQT — from someone who just cleared it',
    content: 'Hey everyone! I just cleared TCS NQT last week and wanted to share what worked for me. Focus heavily on Verbal ability and Reasoning — they matter more than coding in NQT. For coding, practice basic arrays, strings and loops on HackerRank. The test is 3 sections: Verbal (24 mins), Reasoning (30 mins), and Coding (45 mins). Do NOT skip Verbal thinking it is easy — it is timed strictly. All the best to everyone appearing!',
    category: 'Placements',
    authorName: 'Priya Sharma',
    createdAt: '2025-03-12T10:00:00Z',
    upvotes: ['u1', 'u2', 'u3', 'u4', 'u5'],
    downvotes: [],
    comments: [
      { _id: 'c1', authorName: 'Meera R', content: 'Thank you so much! Which mock tests did you use?', createdAt: '2025-03-12T11:00:00Z' },
      { _id: 'c2', authorName: 'Divya K', content: 'This is so helpful. Shared with my whole class!', createdAt: '2025-03-12T12:00:00Z' },
    ]
  },
  {
    _id: '2',
    title: "Anyone else struggling with DBMS unit 3? Let's form a study group",
    content: 'Unit 3 normalization and transactions is killing me honestly. If anyone wants to study together before the internal, comment below. I am thinking we meet in the library on Saturday morning around 10 AM. We can go through the questions from previous year papers together.',
    category: 'Academics',
    authorName: 'Lakshmi V',
    createdAt: '2025-03-11T08:00:00Z',
    upvotes: ['u1', 'u2', 'u3'],
    downvotes: ['u4'],
    comments: [
      { _id: 'c3', authorName: 'Sneha P', content: 'I am in! Saturday 10 AM works for me.', createdAt: '2025-03-11T09:00:00Z' },
    ]
  },
  {
    _id: '3',
    title: 'Built a full stack project using React and Node — looking for feedback',
    content: 'Hey! I just finished building a student attendance management system using React, Node.js and MongoDB. It has QR code based attendance marking, dashboard for faculty and automated email alerts. Looking for feedback before I add it to my resume. Happy to share the GitHub link if anyone is interested in collaborating.',
    category: 'Projects',
    authorName: 'Aisha M',
    createdAt: '2025-03-10T14:00:00Z',
    upvotes: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7'],
    downvotes: [],
    comments: []
  },
  {
    _id: '4',
    title: 'How do I get into the coding club? Are there tryouts?',
    content: 'I am a second year student and really want to join the coding club. I heard they work on some really cool projects. Is there a selection process or can anyone join? Also what tech stack do they mostly use? Any current members here who can help?',
    category: 'Clubs',
    authorName: 'Fatima Z',
    createdAt: '2025-03-09T09:00:00Z',
    upvotes: ['u1', 'u2'],
    downvotes: [],
    comments: [
      { _id: 'c4', authorName: 'Riya T', content: 'Hi! I am in the coding club. We have open recruitment every semester. Watch out for the announcement on the notice board. No strict tryouts, just fill a form and attend an intro meeting!', createdAt: '2025-03-09T10:00:00Z' },
    ]
  },
  {
    _id: '5',
    title: 'Canteen should bring back the Rs 20 meals — who agrees?',
    content: 'The new canteen menu is honestly too expensive for daily use. The old Rs 20 combo (rice + dal + vegetable) was perfect. Now even a basic meal costs Rs 50+. Can someone bring this up with the student council? We should petition for affordable meal options especially for hostelers.',
    category: 'Campus Life',
    authorName: 'Ananya B',
    createdAt: '2025-03-08T12:00:00Z',
    upvotes: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8', 'u9', 'u10', 'u11', 'u12'],
    downvotes: ['u13'],
    comments: [
      { _id: 'c5', authorName: 'Deepa S', content: 'FULLY AGREE. This needs to be raised immediately.', createdAt: '2025-03-08T13:00:00Z' },
      { _id: 'c6', authorName: 'Keerthana M', content: 'Signed! Please someone raise this.', createdAt: '2025-03-08T14:00:00Z' },
    ]
  },
]

const CATEGORY_COLORS = {
  'Academics': 'bg-blue-100 text-blue-700',
  'Placements': 'bg-green-100 text-green-700',
  'Clubs': 'bg-pink-100 text-pink-700',
  'Coding': 'bg-orange-100 text-orange-700',
  'Projects': 'bg-purple-100 text-purple-700',
  'General': 'bg-gray-100 text-gray-700',
  'Help': 'bg-yellow-100 text-yellow-700',
  'Campus Life': 'bg-rose-100 text-rose-700',
}

// Trending links to post _id
const TRENDING = [
  { title: 'TCS NQT tips thread', replies: 24, category: 'Placements', postId: '1' },
  { title: 'DBMS study group Saturday', replies: 12, category: 'Academics', postId: '2' },
  { title: 'Canteen meal prices petition', replies: 31, category: 'Campus Life', postId: '5' },
  { title: 'Coding club recruitment open', replies: 8, category: 'Clubs', postId: '4' },
]

const CURRENT_USER = 'You'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

function PostCard({ post, onVote, onComment, onDeletePost, onDeleteComment }) {
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [expanded, setExpanded] = useState(false)
  const score = post.upvotes.length - post.downvotes.length
  const isLong = post.content.length > 280
  const isMyPost = post.authorName === CURRENT_USER

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="flex gap-0">
        {/* Vote column */}
        <div className="flex flex-col items-center py-5 px-3 bg-gray-50 border-r border-gray-100 gap-1 min-w-[52px]">
          <button
            onClick={() => onVote(post._id, 'up')}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#C41E2A] hover:bg-red-50 transition text-lg"
          >▲</button>
          <span className={`text-sm font-bold ${score > 0 ? 'text-[#C41E2A]' : score < 0 ? 'text-blue-500' : 'text-gray-500'}`}>
            {score}
          </span>
          <button
            onClick={() => onVote(post._id, 'down')}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition text-lg"
          >▼</button>
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[post.category] || 'bg-gray-100 text-gray-700'}`}>
                {post.category}
              </span>
              <span className="text-xs text-gray-400">
                <span className="font-medium text-gray-600">{post.authorName}</span> · {timeAgo(post.createdAt)}
              </span>
            </div>
            {/* Delete post — only show for own posts */}
            {isMyPost && (
              <button
                onClick={() => onDeletePost(post._id)}
                className="text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 px-2 py-1 rounded-lg transition shrink-0"
              >
                🗑 Delete
              </button>
            )}
          </div>

          <h3 className="font-bold text-gray-900 text-base leading-snug mb-2">{post.title}</h3>

          <p className="text-gray-600 text-sm leading-relaxed">
            {isLong && !expanded ? post.content.slice(0, 280) + '...' : post.content}
          </p>
          {isLong && (
            <button onClick={() => setExpanded(!expanded)} className="text-xs text-[#C41E2A] font-medium mt-1 hover:underline">
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}

          {/* Action row */}
          <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-50">
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#C41E2A] transition font-medium"
            >
              💬 {post.comments.length} Comments
            </button>
            <button
              onClick={() => { setShowComments(true) }}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#C41E2A] transition font-medium"
            >
              ✏️ Reply
            </button>
          </div>
        </div>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="border-t border-gray-100 bg-gray-50 px-5 py-4 space-y-3">
          {post.comments.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-1">No comments yet. Start the discussion!</p>
          )}
          {post.comments.map(comment => (
            <div key={comment._id} className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-bold shrink-0">
                {comment.authorName?.charAt(0)}
              </div>
              <div className="flex-1 bg-white rounded-xl px-4 py-2.5 border border-gray-100">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-800">{comment.authorName}</span>
                    <span className="text-xs text-gray-400">{timeAgo(comment.createdAt)}</span>
                  </div>
                  {/* Delete comment — only own comments */}
                  {comment.authorName === CURRENT_USER && (
                    <button
                      onClick={() => onDeleteComment(post._id, comment._id)}
                      className="text-xs text-gray-300 hover:text-red-500 transition"
                    >
                      🗑
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-600">{comment.content}</p>
              </div>
            </div>
          ))}

          {/* Comment box */}
          <div className="flex gap-3 pt-1">
            <div className="w-7 h-7 rounded-full bg-[#C41E2A] flex items-center justify-center text-white text-xs font-bold shrink-0">Y</div>
            <div className="flex-1">
              <textarea
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                rows={2}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E2A] resize-none bg-white"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => { onComment(post._id, commentText); setCommentText('') }}
                  className="text-xs bg-[#C41E2A] text-white px-3 py-1.5 rounded-lg hover:bg-[#9B1520] transition font-medium"
                >
                  Post Comment
                </button>
                <button
                  onClick={() => setShowComments(false)}
                  className="text-xs text-gray-500 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Community() {
  const [posts, setPosts] = useState(MOCK_POSTS)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('new')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'General' })
  const [highlightedPostId, setHighlightedPostId] = useState(null)

  const filtered = posts
    .filter(p => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.content.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
    .sort((a, b) => {
      if (sortBy === 'top') return (b.upvotes.length - b.downvotes.length) - (a.upvotes.length - a.downvotes.length)
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

  const handleVote = (postId, type) => {
    setPosts(prev => prev.map(p => {
      if (p._id !== postId) return p
      const hasUp = p.upvotes.includes('me')
      const hasDown = p.downvotes.includes('me')
      let upvotes = [...p.upvotes]
      let downvotes = [...p.downvotes]
      if (type === 'up') {
        downvotes = downvotes.filter(u => u !== 'me')
        upvotes = hasUp ? upvotes.filter(u => u !== 'me') : [...upvotes, 'me']
      } else {
        upvotes = upvotes.filter(u => u !== 'me')
        downvotes = hasDown ? downvotes.filter(u => u !== 'me') : [...downvotes, 'me']
      }
      return { ...p, upvotes, downvotes }
    }))
  }

  const handleComment = (postId, text) => {
    if (!text.trim()) return
    setPosts(prev => prev.map(p =>
      p._id === postId
        ? { ...p, comments: [...p.comments, { _id: Date.now().toString(), authorName: CURRENT_USER, content: text, createdAt: new Date().toISOString() }] }
        : p
    ))
  }

  const handleDeletePost = (postId) => {
    if (!window.confirm('Delete this post?')) return
    setPosts(prev => prev.filter(p => p._id !== postId))
  }

  const handleDeleteComment = (postId, commentId) => {
    setPosts(prev => prev.map(p =>
      p._id === postId
        ? { ...p, comments: p.comments.filter(c => c._id !== commentId) }
        : p
    ))
  }

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return
    setPosts(prev => [{
      _id: Date.now().toString(),
      ...newPost,
      authorName: CURRENT_USER,
      createdAt: new Date().toISOString(),
      upvotes: [],
      downvotes: [],
      comments: []
    }, ...prev])
    setNewPost({ title: '', content: '', category: 'General' })
    setShowCreateModal(false)
  }

  const handleTrendingClick = (postId) => {
    setSelectedCategory('All')
    setSearch('')
    setHighlightedPostId(postId)
    setTimeout(() => {
      const el = document.getElementById(`post-${postId}`)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => setHighlightedPostId(null), 2000)
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#C41E2A] to-[#9B1520] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-black mb-1">Community</h1>
              <p className="text-red-100 text-sm">Discuss, share and connect with Stanley students</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-white text-[#C41E2A] font-bold px-5 py-2.5 rounded-xl hover:bg-red-50 transition shadow-lg text-sm"
            >
              + New Post
            </button>
          </div>
          <div className="mt-5">
            <div className="relative max-w-xl">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-300">🔍</span>
              <input
                type="text"
                placeholder="Search discussions..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-red-200 focus:outline-none focus:bg-white/30 transition text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters bar */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 py-3">
            <div className="flex gap-2 overflow-x-auto">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat ? 'bg-[#C41E2A] text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex gap-1 shrink-0">
              {['new', 'top'].map(s => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition capitalize ${
                    sortBy === s ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {s === 'new' ? '🕐 New' : '🔥 Top'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Posts feed */}
          <div className="flex-1 space-y-4 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">No posts found</h3>
                <p className="text-gray-400 text-sm">Be the first to start a discussion!</p>
                <button onClick={() => setShowCreateModal(true)} className="mt-4 bg-[#C41E2A] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#9B1520] transition">
                  Create Post
                </button>
              </div>
            ) : (
              filtered.map(post => (
                <div
                  key={post._id}
                  id={`post-${post._id}`}
                  className={`rounded-2xl transition-all duration-500 ${highlightedPostId === post._id ? 'ring-2 ring-[#C41E2A] ring-offset-2' : ''}`}
                >
                  <PostCard
                    post={post}
                    onVote={handleVote}
                    onComment={handleComment}
                    onDeletePost={handleDeletePost}
                    onDeleteComment={handleDeleteComment}
                  />
                </div>
              ))
            )}
          </div>

          {/* Right sidebar */}
          <div className="w-72 shrink-0 hidden lg:block space-y-5">
            {/* Trending */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4">🔥 Trending</h3>
              <div className="space-y-3">
                {TRENDING.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => handleTrendingClick(t.postId)}
                    className="flex items-start gap-3 w-full text-left group hover:bg-gray-50 rounded-xl p-1.5 -mx-1.5 transition"
                  >
                    <span className="text-lg font-black text-gray-200 group-hover:text-[#C41E2A] transition w-5 shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-700 group-hover:text-[#C41E2A] transition leading-snug">{t.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${CATEGORY_COLORS[t.category] || 'bg-gray-100 text-gray-600'}`}>{t.category}</span>
                        <span className="text-xs text-gray-400">{t.replies} comments</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-3">📋 Guidelines</h3>
              <ul className="space-y-2 text-xs text-gray-600">
                {[
                  'Be respectful to all students',
                  'Text only — no images or links in posts',
                  'Stay on topic for your category',
                  'No spam or self-promotion',
                  'Help each other grow!',
                ].map((g, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#C41E2A] mt-0.5">•</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="bg-[#C41E2A] rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-3">Community Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-red-100">Total Posts</span>
                  <span className="font-bold">{posts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-100">Discussions</span>
                  <span className="font-bold">{posts.reduce((a, p) => a + p.comments.length, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-100">Active Today</span>
                  <span className="font-bold">24</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <h2 className="text-xl font-bold mb-1">Create a Post</h2>
            <p className="text-xs text-gray-400 mb-4">Text only — no images, links or videos allowed</p>
            <div className="space-y-3">
              <select
                value={newPost.category}
                onChange={e => setNewPost({...newPost, category: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E2A]"
              >
                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
              </select>
              <input
                placeholder="Post title"
                value={newPost.title}
                onChange={e => setNewPost({...newPost, title: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E2A]"
              />
              <textarea
                placeholder="What's on your mind? Share your thoughts, questions or experiences..."
                rows={5}
                value={newPost.content}
                onChange={e => setNewPost({...newPost, content: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#C41E2A] resize-none"
              />
              <p className="text-xs text-gray-400">{newPost.content.length} characters</p>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleCreatePost} className="flex-1 py-3 bg-[#C41E2A] text-white rounded-xl font-semibold hover:bg-[#9B1520] transition text-sm">Post</button>
              <button onClick={() => setShowCreateModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}