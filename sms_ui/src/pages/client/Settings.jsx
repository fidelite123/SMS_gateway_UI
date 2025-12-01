import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/common/Sidebar';

export default function Settings() {
  const { user, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: user?.profile?.name || '',
    phone: user?.profile?.phone || '',
    company: user?.profile?.company || '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  if (!user) return <div>Loading...</div>;

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role={user.role} />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
            <p className="text-gray-600 mt-1">Manage your account and preferences</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8 border-b bg-white rounded-t-lg">
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-3 px-6 font-semibold transition ${
                activeTab === 'profile'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              👤 Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`pb-3 px-6 font-semibold transition ${
                activeTab === 'security'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🔒 Security
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`pb-3 px-6 font-semibold transition ${
                activeTab === 'notifications'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              🔔 Notifications
            </button>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              ✓ {successMessage}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                      <input
                        type="email"
                        value={user.email}
                        disabled
                        className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                        placeholder="+1234567890"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                        placeholder="Your company name"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 rounded hover:shadow-lg transition"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>

              {/* Account Info Card */}
              <div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-500">Account Type</p>
                      <p className="text-lg font-semibold text-gray-800 capitalize">{user.role}</p>
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-xs text-gray-500">Member Since</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-xs text-gray-500">Account Status</p>
                      <p className="text-lg font-semibold text-green-600">Active</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Security Settings</h2>

              <div className="space-y-6">
                {/* Change Password */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Change Password</h3>
                  <form className="space-y-4">
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="Current password"
                    />
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="New password"
                    />
                    <input
                      type="password"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-600 transition"
                    >
                      Update Password
                    </button>
                  </form>
                </div>

                {/* Two-Factor Authentication */}
                <div className="border-b pb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Two-Factor Authentication</h3>
                  <div className="bg-gray-50 p-4 rounded mb-4">
                    <p className="text-gray-700 mb-3">Add an extra layer of security to your account</p>
                    <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-600 transition">
                      Enable 2FA
                    </button>
                  </div>
                </div>

                {/* Login Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Login Activity</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between p-3 bg-gray-50 rounded">
                      <span>Today at 1:26 PM</span>
                      <span>192.168.1.100 (Chrome on Windows)</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded">
                      <span>Yesterday at 10:15 AM</span>
                      <span>192.168.1.100 (Chrome on Windows)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Notification Preferences</h2>

              <div className="space-y-4">
                {[
                  { label: 'SMS Delivery Notifications', description: 'Get notified about SMS delivery status' },
                  { label: 'Low Balance Alerts', description: 'Alert when wallet balance is low' },
                  { label: 'Campaign Updates', description: 'Updates about your SMS campaigns' },
                  { label: 'Security Alerts', description: 'Important security notifications' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
                    <div>
                      <p className="font-semibold text-gray-800">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2" />
                      <span className="text-sm text-gray-600">Enabled</span>
                    </label>
                  </div>
                ))}
              </div>

              <button className="mt-6 bg-blue-500 text-white font-bold py-2 px-6 rounded hover:bg-blue-600 transition">
                Save Preferences
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
