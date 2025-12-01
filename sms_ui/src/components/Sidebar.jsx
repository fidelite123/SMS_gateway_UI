import { Link } from 'react-router-dom'
import { useStore } from '../store'

export default function Sidebar() {
  const { sidebarOpen, user } = useStore()

  const menuItems = [
    { label: 'Dashboard', path: '/', icon: '📊' },
    { label: 'Calls', path: '/calls', icon: '📞' },
    { label: 'Users', path: '/users', icon: '👥' },
    { label: 'Analytics', path: '/analytics', icon: '📈' },
    { label: 'Settings', path: '/settings', icon: '⚙️' }
  ]

  // Filter menu based on role
  const filteredMenu = user.role === 'admin' ? menuItems : menuItems.filter(m => m.label !== 'Users')

  return (
    <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-dark text-white h-screen shadow-lg transition-all duration-300 fixed left-0 top-16 overflow-y-auto`}>
      <div className="p-4">
        {filteredMenu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition mb-2"
          >
            <span className="text-2xl">{item.icon}</span>
            {sidebarOpen && <span className="font-medium">{item.label}</span>}
          </Link>
        ))}
      </div>
    </aside>
  )
}
