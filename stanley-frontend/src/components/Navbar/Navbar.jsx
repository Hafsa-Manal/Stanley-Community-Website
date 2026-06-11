import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { dbUser, logout } = useAuth()
  const location = useLocation()

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/events', label: 'Events' },
    { to: '/community', label: 'Community' },
  ]

  const isActive = (path) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C41E2A] flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-sm">S</span>
            </div>
            <span className="font-bold text-gray-900 text-lg">Stanley</span>
          </Link>

          {/* Nav links - center */}
          <div className="flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.to)
                    ? 'bg-[#C41E2A] text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {dbUser?.role === 'admin' && (
              <span className="text-xs bg-[#C41E2A] text-white px-2.5 py-1 rounded-full font-semibold">
                Admin
              </span>
            )}
            <Link to="/profile" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-[#C41E2A] flex items-center justify-center text-white text-sm font-bold group-hover:opacity-80 transition">
                {dbUser?.name?.charAt(0)?.toUpperCase() || dbUser?.email?.charAt(0)?.toUpperCase() || 'S'}
              </div>
            </Link>
            <button
              onClick={logout}
              className="text-xs text-gray-500 hover:text-red-600 transition px-3 py-1.5 rounded-lg hover:bg-red-50 font-medium"
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  )
}
