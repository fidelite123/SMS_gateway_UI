import { useState } from 'react'
import { useStore } from '../store'

export default function Settings() {
  const { sidebarOpen, user, darkMode, setDarkMode } = useStore()
  const [settings, setSettings] = useState({
    email: user.email,
    name: user.name,
    notifications: true,
    emailAlerts: true,
    phone: '+1234567890'
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSave = () => {
    alert('Settings saved successfully!')
  }

  return (
    <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8 pt-4`}>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="max-w-2xl">
        {/* Profile Section */}
        <div className="card mb-6">
          <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={settings.name}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={settings.phone}
                onChange={handleChange}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <input
                type="text"
                value={user.role}
                disabled
                className="input bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="card mb-6">
          <h2 className="text-2xl font-semibold mb-4">Preferences</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="notifications"
                checked={settings.notifications}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span className="text-sm font-medium">Enable Notifications</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="emailAlerts"
                checked={settings.emailAlerts}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <span className="text-sm font-medium">Email Alerts</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="w-5 h-5"
              />
              <span className="text-sm font-medium">Dark Mode (Beta)</span>
            </label>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card border-2 border-danger">
          <h2 className="text-2xl font-semibold mb-4 text-danger">Danger Zone</h2>
          <button className="btn btn-danger w-full">Reset Password</button>
          <button className="btn btn-danger w-full mt-2">Download Data</button>
          <button className="btn btn-danger w-full mt-2">Delete Account</button>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="btn btn-primary w-full mt-6"
        >
          Save Settings
        </button>
      </div>
    </div>
  )
}
