import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/common/Sidebar';
import StatCard from '../../components/common/StatCard';

export default function ClientDashboard() {
  const { user, addLog, addContact } = useAuth();
  const [showSendModal, setShowSendModal] = useState(false);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [newSMS, setNewSMS] = useState({ recipient: '', message: '' });
  const [newContact, setNewContact] = useState({ name: '', phone: '', group: 'Personal' });

  if (!user) return <div>Loading...</div>;

  const handleSendSMS = (e) => {
    e.preventDefault();
    if (newSMS.recipient && newSMS.message) {
      addLog({
        recipient: newSMS.recipient,
        message: newSMS.message,
        status: 'delivered',
      });
      setNewSMS({ recipient: '', message: '' });
      setShowSendModal(false);
    }
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    if (newContact.name && newContact.phone) {
      addContact(newContact);
      setNewContact({ name: '', phone: '', group: 'Personal' });
      setShowAddContactModal(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar role="client" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Client Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome, {user.email}</p>
            </div>
            <button
              onClick={() => setShowSendModal(true)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Send SMS
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard title="Wallet Balance" value={`$${user.data.walletBalance.toFixed(2)}`} color="blue" />
            <StatCard title="SMS Today" value={user.data.smsSentToday} color="green" />
            <StatCard title="SMS This Month" value={user.data.smsSentThisMonth} color="purple" />
            <StatCard title="Delivery Rate" value={`${user.data.deliveryRate}%`} color="yellow" />
          </div>

          {/* SMS Logs and Contacts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent SMS</h2>
              {user.data.logs && user.data.logs.length > 0 ? (
                <table className="w-full text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left">Recipient</th>
                      <th className="px-4 py-2 text-left">Message</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.data.logs.map((log) => (
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-600">No SMS sent yet. Send your first SMS!</p>
              )}
            </div>

            {/* Contacts Sidebar */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Quick Contacts</h2>
                <button
                  onClick={() => setShowAddContactModal(true)}
                  className="text-blue-500 hover:text-blue-600 text-sm font-semibold"
                >
                  + Add
                </button>
              </div>
              <div className="space-y-3">
                {user.data.contacts && user.data.contacts.length > 0 ? (
                  user.data.contacts.map((contact) => (
                    <div key={contact.id} className="border-b pb-3">
                      <p className="font-semibold text-gray-800">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.phone}</p>
                      <p className="text-xs text-gray-500">{contact.group}</p>
                      <button
                        onClick={() => setNewSMS({ recipient: contact.phone, message: '' }) || setShowSendModal(true)}
                        className="text-blue-500 text-sm hover:underline mt-2"
                      >
                        Send SMS
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">No contacts yet</p>
                )}
              </div>
            </div>
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
                      className="flex-1 bg-green-500 text-white font-bold py-2 rounded hover:bg-green-600 transition"
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

          {/* Add Contact Modal */}
          {showAddContactModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Contact</h2>
                <form onSubmit={handleAddContact}>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="Contact name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="+1234567890"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Group</label>
                    <select
                      value={newContact.group}
                      onChange={(e) => setNewContact({ ...newContact, group: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                    >
                      <option value="Personal">Personal</option>
                      <option value="Business">Business</option>
                      <option value="Family">Family</option>
                      <option value="Friends">Friends</option>
                    </select>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddContactModal(false)}
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
