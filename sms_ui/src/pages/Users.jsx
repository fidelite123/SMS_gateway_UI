import { useState } from 'react'
import { mockUsers } from '../mockData'
import { useStore } from '../store'

export default function Users() {
  const { sidebarOpen, user: currentUser } = useStore()
  const [users] = useState(mockUsers)

  // Check if user has permission
  if (currentUser.role !== 'admin') {
    return (
      <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8 pt-4`}>
        <div className="card bg-red-50 border border-red-200">
          <p className="text-red-600">❌ Access Denied: Only admins can view this page</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8 pt-4`}>
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="card hover:shadow-lg transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Role:</span>
                <span className="font-medium capitalize">{user.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Calls:</span>
                <span className="font-medium">{user.calls}</span>
              </div>
            </div>
            <button className="btn btn-primary w-full mt-4">Edit User</button>
          </div>
        ))}
      </div>
    </div>
  )
}
