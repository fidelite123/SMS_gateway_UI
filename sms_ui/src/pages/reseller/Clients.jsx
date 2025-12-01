import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/common/Sidebar';

export default function ResellerClients() {
  const { user, updateUserData } = useAuth();
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [newClient, setNewClient] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    company: '',
    status: 'active'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  if (!user) return <div>Loading...</div>;

  const clients = user.data.clients || [];

  const handleAddClient = (e) => {
    e.preventDefault();
    if (newClient.name && newClient.email) {
      const client = {
        id: Date.now(),
        ...newClient,
        createdDate: new Date().toISOString().split('T')[0],
        walletBalance: 0,
        smsSent: 0,
        deliveryRate: 0,
      };
      
      updateUserData({ clients: [...clients, client] });
      setNewClient({ name: '', email: '', phone: '', company: '', status: 'active' });
      setShowAddClientModal(false);
    }
  };

  const handleDeleteClient = (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      updateUserData({ clients: clients.filter(c => c.id !== id) });
    }
  };

  const handleUpdateClient = (e) => {
    e.preventDefault();
    const updatedClients = clients.map(c => 
      c.id === selectedClient.id ? selectedClient : c
    );
    updateUserData({ clients: updatedClients });
    setShowDetailModal(false);
    setSelectedClient(null);
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    suspended: clients.filter(c => c.status === 'suspended').length,
    totalWallet: clients.reduce((sum, c) => sum + (c.walletBalance || 0), 0),
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="reseller" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">My Clients</h1>
              <p className="text-gray-600 mt-1">Manage your client accounts and activities</p>
            </div>
            <button
              onClick={() => setShowAddClientModal(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition font-semibold"
            >
              + Add New Client
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Total Clients</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{stats.total}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Active</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.active}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Suspended</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{stats.suspended}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 text-sm">Total Wallet Balance</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">${stats.totalWallet.toFixed(2)}</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex gap-4 flex-col md:flex-row">
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          {/* Clients Grid/Table */}
          {filteredClients.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClients.map(client => (
                <div key={client.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{client.name}</h3>
                        <p className="text-sm text-gray-600">{client.company || 'No company'}</p>
                      </div>
                      <span className={`px-3 py-1 rounded text-xs font-semibold ${
                        client.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {client.status}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4 text-sm">
                      <p className="text-gray-600"><strong>Email:</strong> {client.email}</p>
                      <p className="text-gray-600"><strong>Phone:</strong> {client.phone || 'N/A'}</p>
                      <p className="text-gray-600"><strong>Created:</strong> {client.createdDate}</p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-600">Wallet Balance</span>
                        <span className="text-lg font-bold text-blue-600">${client.walletBalance?.toFixed(2)}</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        SMS Sent: {client.smsSent || 0} | Delivery: {client.deliveryRate || 0}%
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedClient(client);
                          setShowDetailModal(true);
                        }}
                        className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition font-semibold text-sm"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client.id)}
                        className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition font-semibold text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-600 text-lg mb-4">No clients found</p>
              {clients.length === 0 ? (
                <button
                  onClick={() => setShowAddClientModal(true)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Add Your First Client
                </button>
              ) : null}
            </div>
          )}

          {/* Add Client Modal */}
          {showAddClientModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Client</h2>
                <form onSubmit={handleAddClient} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Client Name *</label>
                    <input
                      type="text"
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="Client name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={newClient.email}
                      onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="client@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={newClient.phone}
                      onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="+1234567890"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Company</label>
                    <input
                      type="text"
                      value={newClient.company}
                      onChange={(e) => setNewClient({ ...newClient, company: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Initial Status</label>
                    <select
                      value={newClient.status}
                      onChange={(e) => setNewClient({ ...newClient, status: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 rounded hover:shadow-lg transition"
                    >
                      Add Client
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddClientModal(false)}
                      className="flex-1 bg-gray-300 text-gray-800 font-bold py-2 rounded hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Client Detail Modal */}
          {showDetailModal && selectedClient && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl max-h-96 overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Client Details</h2>
                <form onSubmit={handleUpdateClient} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Name</label>
                      <input
                        type="text"
                        value={selectedClient.name}
                        onChange={(e) => setSelectedClient({ ...selectedClient, name: e.target.value })}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        value={selectedClient.email}
                        onChange={(e) => setSelectedClient({ ...selectedClient, email: e.target.value })}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                      <input
                        type="tel"
                        value={selectedClient.phone}
                        onChange={(e) => setSelectedClient({ ...selectedClient, phone: e.target.value })}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Company</label>
                      <input
                        type="text"
                        value={selectedClient.company}
                        onChange={(e) => setSelectedClient({ ...selectedClient, company: e.target.value })}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Wallet Balance</label>
                      <input
                        type="number"
                        value={selectedClient.walletBalance}
                        onChange={(e) => setSelectedClient({ ...selectedClient, walletBalance: parseFloat(e.target.value) })}
                        step="0.01"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">SMS Sent</label>
                      <input
                        type="number"
                        value={selectedClient.smsSent}
                        onChange={(e) => setSelectedClient({ ...selectedClient, smsSent: parseInt(e.target.value) })}
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Delivery Rate %</label>
                      <input
                        type="number"
                        value={selectedClient.deliveryRate}
                        onChange={(e) => setSelectedClient({ ...selectedClient, deliveryRate: parseFloat(e.target.value) })}
                        min="0"
                        max="100"
                        step="0.1"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Status</label>
                    <select
                      value={selectedClient.status}
                      onChange={(e) => setSelectedClient({ ...selectedClient, status: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                    >
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 rounded hover:shadow-lg transition"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowDetailModal(false);
                        setSelectedClient(null);
                      }}
                      className="flex-1 bg-gray-300 text-gray-800 font-bold py-2 rounded hover:bg-gray-400 transition"
                    >
                      Close
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
