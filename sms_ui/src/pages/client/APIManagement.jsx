import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/common/Sidebar';

export default function APIManagement() {
  const { user } = useAuth();
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: 'Production Key',
      key: 'sk_live_abc123def456ghi789',
      status: 'active',
      createdDate: '2025-11-01',
      lastUsed: '2025-12-01',
      requests: 15234,
    },
    {
      id: 2,
      name: 'Development Key',
      key: 'sk_test_xyz789uvw012rst345',
      status: 'active',
      createdDate: '2025-11-15',
      lastUsed: '2025-12-01',
      requests: 342,
    },
  ]);
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [keyName, setKeyName] = useState('');
  const [ipWhitelist, setIpWhitelist] = useState('');

  if (!user) return <div>Loading...</div>;

  const handleCreateKey = (e) => {
    e.preventDefault();
    const newKey = {
      id: Date.now(),
      name: keyName,
      key: `sk_${Math.random().toString(36).substring(2, 15)}`,
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      requests: 0,
    };
    setApiKeys([...apiKeys, newKey]);
    setKeyName('');
    setShowNewKeyModal(false);
  };

  const revokeKey = (id) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar role="client" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">API Management</h1>
              <p className="text-gray-600 mt-1">Manage your API keys and integrations</p>
            </div>
            <button
              onClick={() => setShowNewKeyModal(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              + New API Key
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* API Keys List */}
            <div className="lg:col-span-2 space-y-6">
              {apiKeys.map(key => (
                <div key={key.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{key.name}</h3>
                      <p className="text-sm text-gray-500">Created {key.createdDate}</p>
                    </div>
                    <span className="px-3 py-1 rounded text-sm font-semibold bg-green-100 text-green-800">
                      {key.status}
                    </span>
                  </div>

                  {/* API Key Display */}
                  <div className="bg-gray-100 rounded p-4 mb-4 font-mono text-sm flex justify-between items-center">
                    <span className="text-gray-700 break-all">{key.key}</span>
                    <button className="text-blue-500 hover:text-blue-700 ml-4 whitespace-nowrap">
                      Copy
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Last Used</p>
                      <p className="font-semibold text-gray-800">{key.lastUsed}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total Requests</p>
                      <p className="font-semibold text-gray-800">{key.requests.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 text-blue-500 hover:bg-blue-50 py-2 rounded transition border border-blue-500">
                      Regenerate
                    </button>
                    <button
                      onClick={() => revokeKey(key.id)}
                      className="flex-1 text-red-500 hover:bg-red-50 py-2 rounded transition border border-red-500"
                    >
                      Revoke
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Documentation & Quick Start */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 API Stats</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500">Total Requests (30d)</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {apiKeys.reduce((sum, k) => sum + k.requests, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-500">Requests This Month</p>
                    <p className="text-lg font-semibold text-gray-800">15,576</p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">📚 Documentation</h3>
                <div className="space-y-3">
                  <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm font-semibold">
                    → API Documentation
                  </a>
                  <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm font-semibold">
                    → Code Examples
                  </a>
                  <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm font-semibold">
                    → Webhook Setup
                  </a>
                  <a href="#" className="block text-blue-600 hover:text-blue-800 text-sm font-semibold">
                    → Status Page
                  </a>
                </div>
              </div>

              {/* IP Whitelist */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">🔒 IP Whitelist</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Restrict API access to specific IP addresses
                </p>
                <button className="w-full border-2 border-gray-300 text-gray-700 py-2 rounded hover:border-gray-400 transition font-semibold">
                  Configure IPs
                </button>
              </div>
            </div>
          </div>

          {/* API Endpoints Reference */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">🔗 Main API Endpoints</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-bold mb-3 inline-block">POST</div>
                <p className="font-mono text-sm text-gray-700 mb-2">/api/v1/sms/send</p>
                <p className="text-sm text-gray-600">Send a single SMS message</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-bold mb-3 inline-block">POST</div>
                <p className="font-mono text-sm text-gray-700 mb-2">/api/v1/sms/send-bulk</p>
                <p className="text-sm text-gray-600">Send bulk SMS messages</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm font-bold mb-3 inline-block">GET</div>
                <p className="font-mono text-sm text-gray-700 mb-2">/api/v1/sms/status</p>
                <p className="text-sm text-gray-600">Check message delivery status</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded text-sm font-bold mb-3 inline-block">GET</div>
                <p className="font-mono text-sm text-gray-700 mb-2">/api/v1/account/balance</p>
                <p className="text-sm text-gray-600">Get account balance and limits</p>
              </div>
            </div>
          </div>

          {/* Create Key Modal */}
          {showNewKeyModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New API Key</h2>
                <form onSubmit={handleCreateKey}>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Key Name</label>
                    <input
                      type="text"
                      value={keyName}
                      onChange={(e) => setKeyName(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="e.g., Production"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">IP Whitelist (Optional)</label>
                    <textarea
                      value={ipWhitelist}
                      onChange={(e) => setIpWhitelist(e.target.value)}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="192.168.1.1&#10;10.0.0.0/8"
                      rows="3"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition"
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewKeyModal(false)}
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
