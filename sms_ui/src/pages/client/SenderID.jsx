import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/common/Sidebar';

export default function SenderIDManagement() {
  const { user } = useAuth();
  const [senderIds, setSenderIds] = useState([
    { id: 1, senderId: 'WeCall', status: 'approved', submittedDate: '2025-11-15' },
    { id: 2, senderId: 'Support', status: 'pending', submittedDate: '2025-12-01' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newSenderId, setNewSenderId] = useState('');

  if (!user) return <div>Loading...</div>;

  const handleSubmitSenderId = (e) => {
    e.preventDefault();
    if (newSenderId.trim()) {
      setSenderIds([
        ...senderIds,
        {
          id: Date.now(),
          senderId: newSenderId,
          status: 'pending',
          submittedDate: new Date().toISOString().split('T')[0],
        },
      ]);
      setNewSenderId('');
      setShowModal(false);
    }
  };

  const approved = senderIds.filter(s => s.status === 'approved');
  const pending = senderIds.filter(s => s.status === 'pending');
  const rejected = senderIds.filter(s => s.status === 'rejected');

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar role="client" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Sender ID Management</h1>
              <p className="text-gray-600 mt-1">Manage and approve your sender IDs</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              + Submit Sender ID
            </button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Approved</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{approved.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{pending.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Rejected</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{rejected.length}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="space-y-6">
            {/* Approved */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">✅ Approved Sender IDs</h2>
              {approved.length > 0 ? (
                <div className="space-y-3">
                  {approved.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-800">{item.senderId}</p>
                        <p className="text-sm text-gray-600">Approved on {item.submittedDate}</p>
                      </div>
                      <span className="px-3 py-1 rounded text-sm font-semibold bg-green-100 text-green-800">
                        Approved
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No approved sender IDs yet</p>
              )}
            </div>

            {/* Pending */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">⏳ Pending Review</h2>
              {pending.length > 0 ? (
                <div className="space-y-3">
                  {pending.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-800">{item.senderId}</p>
                        <p className="text-sm text-gray-600">Submitted on {item.submittedDate}</p>
                      </div>
                      <span className="px-3 py-1 rounded text-sm font-semibold bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No pending sender IDs</p>
              )}
            </div>

            {/* Rejected */}
            {rejected.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">❌ Rejected</h2>
                <div className="space-y-3">
                  {rejected.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div>
                        <p className="font-semibold text-gray-800">{item.senderId}</p>
                        <p className="text-sm text-gray-600">Rejected on {item.submittedDate}</p>
                      </div>
                      <span className="px-3 py-1 rounded text-sm font-semibold bg-red-100 text-red-800">
                        Rejected
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Guidelines */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">📋 Sender ID Guidelines</h3>
            <ul className="space-y-2 text-blue-800 text-sm">
              <li>✓ Sender ID must be 3-20 alphanumeric characters</li>
              <li>✓ No spaces or special characters allowed</li>
              <li>✓ Must comply with local regulations</li>
              <li>✓ Approval typically takes 24-48 hours</li>
              <li>✓ Ensure it represents your business name or brand</li>
            </ul>
          </div>

          {/* Submit Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit New Sender ID</h2>
                <form onSubmit={handleSubmitSenderId}>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Sender ID</label>
                    <input
                      type="text"
                      value={newSenderId}
                      onChange={(e) => setNewSenderId(e.target.value)}
                      maxLength="20"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="e.g., MyBusiness"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-2">3-20 alphanumeric characters</p>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
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
