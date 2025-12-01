import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/common/Sidebar';
import StatCard from '../../components/common/StatCard';

export default function ResellerDashboard() {
  const { user, addLog, updateUserData } = useAuth();
  const [showSendModal, setShowSendModal] = useState(false);
  const [newSMS, setNewSMS] = useState({ recipient: '', message: '' });

  if (!user) return <div>Loading...</div>;

  const handleSendSMS = (e) => {
    e.preventDefault();
    if (newSMS.recipient && newSMS.message) {
      addLog({
        recipient: newSMS.recipient,
        message: newSMS.message,
        status: 'delivered',
        cost: 0.05,
      });
      setNewSMS({ recipient: '', message: '' });
      setShowSendModal(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar role="reseller" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Reseller Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome, {user.email}</p>
            </div>
            <button
              onClick={() => setShowSendModal(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Send SMS
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Clients" value={user.data.totalClients} color="blue" />
            <StatCard title="Active Campaigns" value={user.data.activeSMSCampaigns} color="green" />
            <StatCard title="SMS Sent" value={`${(user.data.totalSMSSent / 1000).toFixed(1)}K`} color="purple" />
            <StatCard title="Wallet Balance" value={`$${user.data.walletBalance.toFixed(2)}`} color="yellow" />
          </div>

          {/* SMS Logs */}
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent SMS Logs</h2>
            {user.data.logs && user.data.logs.length > 0 ? (
              <table className="w-full text-sm">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left">Recipient</th>
                    <th className="px-4 py-2 text-left">Message</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {user.data.logs.slice(0, 5).map((log) => (
                    <tr key={log.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{log.recipient}</td>
                      <td className="px-4 py-3 truncate">{log.message}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          log.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          log.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{log.date}</td>
                      <td className="px-4 py-3">${log.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-600">No SMS logs yet. Send your first SMS to get started!</p>
            )}
          </div>

          {/* Send SMS Modal */}
          {showSendModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Send SMS</h2>
                <form onSubmit={handleSendSMS}>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Recipient</label>
                    <input
                      type="tel"
                      value={newSMS.recipient}
                      onChange={(e) => setNewSMS({ ...newSMS, recipient: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="+1234567890"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Message</label>
                    <textarea
                      value={newSMS.message}
                      onChange={(e) => setNewSMS({ ...newSMS, message: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="Enter your message"
                      rows="4"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition"
                    >
                      Send
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowSendModal(false)}
                      className="flex-1 bg-gray-300 text-gray-800 font-bold py-2 rounded hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
