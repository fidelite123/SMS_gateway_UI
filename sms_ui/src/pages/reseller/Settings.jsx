import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import TopNavigation from '../../components/common/TopNavigation';
import { Eye, EyeOff, Copy, Check, Plus, Trash2, X, ArrowLeft } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [copied, setCopied] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Acme Reseller',
    email: 'admin@acmereseller.com',
    phone: '+1234567890',
    country: 'United States'
  });

  // SAFE MOCK API KEY (NO REAL KEY)
  const [apiKey, setApiKey] = useState('********-API-KEY-HIDDEN');
  const [showApiKey, setShowApiKey] = useState(false);

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', email: 'john@acmereseller.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@acmereseller.com', role: 'Manager' }
  ]);

  const [newTeamMember, setNewTeamMember] = useState({ name: '', email: '', role: 'User' });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    dailySummary: true,
    weeklyReport: true,
    promotions: false
  });

  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: '',
    showCurrent: false,
    showNew: false,
    showConfirm: false
  });

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleAddTeamMember = () => {
    if (newTeamMember.name && newTeamMember.email) {
      setTeamMembers([...teamMembers, { id: Date.now(), ...newTeamMember }]);
      setNewTeamMember({ name: '', email: '', role: 'User' });
      setShowTeamModal(false);
    }
  };

  const handleRemoveTeamMember = (id) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id));
  };

  const handleNotificationChange = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  return (
    <div className="flex h-screen bg-black">
      <Sidebar role="reseller" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavigation />
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">

            {/* Header */}
            <div className="flex items-center gap-2 mb-8">
              <a href="/reseller/dashboard" className="text-indigo-600 hover:text-indigo-700">
                <ArrowLeft size={20} />
              </a>
              <div>
                <h1 className="text-4xl font-bold text-white">Settings</h1>
                <p className="text-gray-400 ml-8">Manage your account settings, security, and team</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-800 mb-6">
              <div className="flex border-b border-gray-800 flex-wrap">
                {['profile', 'security', 'notifications', 'team'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 font-medium transition border-b-2 ${
                      activeTab === tab
                        ? 'text-indigo-400 border-indigo-400'
                        : 'text-gray-400 border-transparent hover:text-white'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Company Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Country</label>
                    <select
                      value={profile.country}
                      onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg">
                  Save Changes
                </button>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="p-6 space-y-6">

                {/* Change Password */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Current Password</label>
                      <div className="flex gap-2">
                        <input
                          type={passwordForm.showCurrent ? 'text' : 'password'}
                          value={passwordForm.current}
                          onChange={(e) =>
                            setPasswordForm({ ...passwordForm, current: e.target.value })
                          }
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                        />
                        <button
                          onClick={() =>
                            setPasswordForm({
                              ...passwordForm,
                              showCurrent: !passwordForm.showCurrent
                            })
                          }
                          className="text-gray-600 px-3 py-2"
                        >
                          {passwordForm.showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">New Password</label>
                      <div className="flex gap-2">
                        <input
                          type={passwordForm.showNew ? 'text' : 'password'}
                          value={passwordForm.new}
                          onChange={(e) =>
                            setPasswordForm({ ...passwordForm, new: e.target.value })
                          }
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                        />
                        <button
                          onClick={() =>
                            setPasswordForm({
                              ...passwordForm,
                              showNew: !passwordForm.showNew
                            })
                          }
                          className="text-gray-600 px-3 py-2"
                        >
                          {passwordForm.showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Confirm Password</label>
                      <div className="flex gap-2">
                        <input
                          type={passwordForm.showConfirm ? 'text' : 'password'}
                          value={passwordForm.confirm}
                          onChange={(e) =>
                            setPasswordForm({ ...passwordForm, confirm: e.target.value })
                          }
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                        />
                        <button
                          onClick={() =>
                            setPasswordForm({
                              ...passwordForm,
                              showConfirm: !passwordForm.showConfirm
                            })
                          }
                          className="text-gray-600 px-3 py-2"
                        >
                          {passwordForm.showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg">
                    Update Password
                  </button>
                </div>

                {/* API Key */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">API Key</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Use this key to authenticate API requests.
                  </p>

                  <div className="flex gap-2 items-center mb-4">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      value={apiKey}
                      readOnly
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 font-mono text-sm"
                    />

                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="text-gray-600 px-3 py-2"
                    >
                      {showApiKey ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>

                    <button
                      onClick={handleCopyApiKey}
                      className="text-gray-600 px-3 py-2 flex items-center gap-1"
                    >
                      {copied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                  </div>

                  <button className="bg-red-600 text-white px-6 py-2 rounded-lg">
                    Regenerate Key
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="p-6 space-y-4">
                {Object.entries({
                  emailAlerts: 'Email Alerts',
                  smsAlerts: 'SMS Alerts',
                  dailySummary: 'Daily Summary',
                  weeklyReport: 'Weekly Report',
                  promotions: 'Promotions & Updates'
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={notifications[key]}
                      onChange={() => handleNotificationChange(key)}
                      className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                    />
                    <label className="cursor-pointer font-medium text-gray-900">{label}</label>
                  </div>
                ))}
                <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg">
                  Save Preferences
                </button>
              </div>
            )}

            {/* Team Tab */}
            {activeTab === 'team' && (
              <div className="p-6">
                <button
                  onClick={() => setShowTeamModal(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 mb-6"
                >
                  <Plus size={20} /> Add Team Member
                </button>

                <div className="space-y-3">
                  {teamMembers.map(member => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.email}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                          {member.role}
                        </span>
                        <button
                          onClick={() => handleRemoveTeamMember(member.id)}
                          className="text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Team Modal */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">

            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">Add Team Member</h2>
              <button
                onClick={() => setShowTeamModal(false)}
                className="text-gray-500"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newTeamMember.name}
                onChange={(e) =>
                  setNewTeamMember({ ...newTeamMember, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />

              <input
                type="email"
                placeholder="Email"
                value={newTeamMember.email}
                onChange={(e) =>
                  setNewTeamMember({ ...newTeamMember, email: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />

              <select
                value={newTeamMember.role}
                onChange={(e) =>
                  setNewTeamMember({ ...newTeamMember, role: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="User">User</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowTeamModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleAddTeamMember}
                className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
