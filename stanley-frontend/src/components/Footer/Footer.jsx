import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#C41E2A] flex items-center justify-center">
                <span className="text-white font-black text-xs">S</span>
              </div>
              <span className="font-bold text-lg">Stanley Community</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">Building a stronger Stanley student community.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-[#C41E2A]">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <Link to="/" className="hover:text-white transition">Home</Link>
              <Link to="/events" className="hover:text-white transition">Events</Link>
              <Link to="/community" className="hover:text-white transition">Community</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-[#C41E2A]">Community</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <span>About Stanley</span>
              <span>Community Guidelines</span>
              <span>Stanley College of Engineering & Technology for Women</span>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Stanley Community Portal. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
