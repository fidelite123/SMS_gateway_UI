import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/common/Sidebar';

export default function ClientContacts() {
  const { user, addContact } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', group: 'Personal' });

  if (!user) return <div>Loading...</div>;

  const handleAddContact = (e) => {
    e.preventDefault();
    if (newContact.name && newContact.phone) {
      addContact(newContact);
      setNewContact({ name: '', phone: '', group: 'Personal' });
      setShowAddModal(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="client" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Contacts</h1>
              <p className="text-gray-600 mt-1">Manage your quick contacts for easy SMS sending</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              + Add Contact
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.data.contacts && user.data.contacts.length > 0 ? (
              user.data.contacts.map((contact) => (
                <div key={contact.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{contact.name}</h3>
                  <p className="text-gray-600 mb-1">📱 {contact.phone}</p>
                  <p className="text-sm text-gray-500 mb-4">Group: {contact.group}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition text-sm">
                      Send SMS
                    </button>
                    <button className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">No contacts yet. Add your first contact!</p>
              </div>
            )}
          </div>

          {/* Add Contact Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Contact</h2>
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
                      onClick={() => setShowAddModal(false)}
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
