import { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../lib/firebase'

export default function Login() {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email.endsWith('@stanley.edu.in')) {
      setError('Only @stanley.edu.in email addresses are allowed.')
      return
    }
    setLoading(true)
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
    } catch (err) {
      if (err.code === 'auth/user-not-found') setError('No account found. Please sign up.')
      else if (err.code === 'auth/wrong-password') setError('Incorrect password.')
      else if (err.code === 'auth/email-already-in-use') setError('Email already registered. Please log in.')
      else if (err.code === 'auth/weak-password') setError('Password must be at least 6 characters.')
      else setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#C41E2A] flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full border-2 border-white"
              style={{ width: `${(i+1)*120}px`, height: `${(i+1)*120}px`, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          ))}
        </div>
        <div className="relative z-10 text-center text-white">
          <div className="w-28 h-28 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/30">
            <span className="text-5xl font-black text-white">S</span>
          </div>
          <h1 className="text-4xl font-black mb-2">Stanley</h1>
          <p className="text-xl font-light text-red-100">College of Engineering &</p>
          <p className="text-xl font-light text-red-100">Technology for Women</p>
          <div className="mt-10 space-y-3 text-left">
            {['Connect with your peers', 'Discover opportunities', 'Never miss an event'].map(t => (
              <div key={t} className="flex items-center gap-3 text-red-100">
                <div className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center text-xs">✓</div>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#C41E2A] flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl font-black text-white">S</span>
            </div>
            <h1 className="text-2xl font-black text-[#C41E2A]">Stanley Community</h1>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            {isSignup ? 'Join the Stanley student community' : 'Sign in to your Stanley account'}
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-5 text-sm flex items-start gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="yourname@stanley.edu.in"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C41E2A] focus:border-transparent text-sm transition bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C41E2A] focus:border-transparent text-sm transition bg-gray-50"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#C41E2A] text-white font-semibold hover:bg-[#9B1520] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-200 mt-2"
            >
              {loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-5 text-center">
            <button
              onClick={() => { setIsSignup(!isSignup); setError('') }}
              className="text-sm text-[#C41E2A] hover:underline font-medium"
            >
              {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-4 bg-gray-50 rounded-lg py-2">
            🔒 Only @stanley.edu.in emails are allowed
          </p>
        </div>
      </div>
    </div>
  )
}
