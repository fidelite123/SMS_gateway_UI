import { Link } from 'react-router-dom'
import { useStore } from '../store'

export default function Navbar() {
  const { user, sidebarOpen, setSidebarOpen } = useStore()

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-blue-600 rounded-lg transition"
          >
            ☰
          </button>
          <Link to="/" className="text-2xl font-bold">
            📞 WeCall
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm">Welcome, {user.name}</span>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl">
            {user.avatar}
          </div>
        </div>
      </div>
    </nav>
  )
}
