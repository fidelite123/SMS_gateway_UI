import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/common/Sidebar';

const buildStorageKey = (userId) => `client_contact_groups_${userId}`;

export default function ClientContacts() {
  const { user, addContact, updateUserData } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });
  const [editContact, setEditContact] = useState(null);
  const [groups, setGroups] = useState([]);
  const [groupForm, setGroupForm] = useState({ id: null, name: '', description: '' });
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showMembers, setShowMembers] = useState(false);
  const [message, setMessage] = useState('');

  if (!user) return <div>Loading...</div>;
  const storageKey = buildStorageKey(user.id);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try { setGroups(JSON.parse(saved)); } catch { /* ignore */ }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const saveGroups = (newGroups) => {
    setGroups(newGroups);
    localStorage.setItem(storageKey, JSON.stringify(newGroups));
  };

  const createOrUpdateGroup = (e) => {
    e.preventDefault();
    if (!groupForm.name.trim()) return;
    if (groupForm.id) {
      const updated = groups.map(g => g.id === groupForm.id ? { ...g, name: groupForm.name, description: groupForm.description } : g);
      saveGroups(updated);
      setMessage('Group updated');
    } else {
      const newGroup = { id: Date.now(), name: groupForm.name, description: groupForm.description, members: [] };
      saveGroups([...groups, newGroup]);
      setMessage('Group created');
    }
    setGroupForm({ id: null, name: '', description: '' });
    setTimeout(()=>setMessage(''),2000);
  };

  const editGroup = (g) => setGroupForm({ id: g.id, name: g.name, description: g.description || '' });

  const deleteGroup = (id) => {
    if (!confirm('Delete this group?')) return;
    const updated = groups.filter(g => g.id !== id);
    saveGroups(updated);
    if (selectedGroup && selectedGroup.id === id) { setSelectedGroup(null); setShowMembers(false); }
    setMessage('Group deleted');
    setTimeout(()=>setMessage(''),2000);
  };

  const viewMembers = (g) => { setSelectedGroup(g); setShowMembers(true); };

  const addMember = (contactId) => {
    if (!selectedGroup) return;
    const updated = groups.map(g => {
      if (g.id === selectedGroup.id) {
        const members = g.members || [];
        if (!members.includes(contactId)) return { ...g, members: [...members, contactId] };
      }
      return g;
    });
    saveGroups(updated);
    setSelectedGroup(updated.find(g => g.id === selectedGroup.id));
  };

  const removeMember = (contactId) => {
    if (!selectedGroup) return;
    const updated = groups.map(g => g.id === selectedGroup.id ? { ...g, members: (g.members||[]).filter(m => m !== contactId) } : g);
    saveGroups(updated);
    setSelectedGroup(updated.find(g => g.id === selectedGroup.id));
  };

  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newContact.name || !newContact.phone) return;
    const chosenGroup = groups[0]; // auto-assign first group if exists
    const created = addContact({ name: newContact.name, phone: newContact.phone, group: chosenGroup ? chosenGroup.name : 'Ungrouped' });
    if (chosenGroup) {
      const updated = groups.map(g => g.id === chosenGroup.id ? { ...g, members: [...(g.members||[]), created.id] } : g);
      saveGroups(updated);
    }
    setNewContact({ name: '', phone: '' });
    setShowAddModal(false);
  };

  const handleDeleteContact = (contactId) => {
      const openEditContact = (contact) => {
        setEditContact({ ...contact });
        setShowEditModal(true);
      };

      const handleUpdateContact = (e) => {
        e.preventDefault();
        if (!editContact || !editContact.name || !editContact.phone) return;
        const contacts = user.data.contacts || [];
        // Track original group for membership adjustment
        const original = contacts.find(c => c.id === editContact.id);
        const updatedContacts = contacts.map(c => c.id === editContact.id ? editContact : c);
        updateUserData({ contacts: updatedContacts });

        // Adjust group membership arrays if group changed
        if (original && original.group !== editContact.group) {
          let adjustedGroups = groups.map(g => {
            // remove from any group where membership exists and not new group
            if ((g.members || []).includes(editContact.id) && g.name !== editContact.group) {
              return { ...g, members: g.members.filter(m => m !== editContact.id) };
            }
            return g;
          });
          // Add to new group if exists
          adjustedGroups = adjustedGroups.map(g => {
            if (g.name === editContact.group) {
              const members = g.members || [];
              if (!members.includes(editContact.id)) {
                return { ...g, members: [...members, editContact.id] };
              }
            }
            return g;
          });
          saveGroups(adjustedGroups);
        }
        setShowEditModal(false);
        setEditContact(null);
        setMessage('Contact updated');
        setTimeout(()=>setMessage(''),2000);
      };

      const handleQuickGroupChange = (contact, newGroupName) => {
        const contacts = user.data.contacts || [];
        const updatedContact = { ...contact, group: newGroupName };
        const updatedContacts = contacts.map(c => c.id === contact.id ? updatedContact : c);
        updateUserData({ contacts: updatedContacts });
        // adjust membership arrays similar to edit
        let adjustedGroups = groups.map(g => {
          if ((g.members || []).includes(contact.id) && g.name !== newGroupName) {
            return { ...g, members: g.members.filter(m => m !== contact.id) };
          }
          return g;
        });
        adjustedGroups = adjustedGroups.map(g => {
          if (g.name === newGroupName) {
            const members = g.members || [];
            if (!members.includes(contact.id)) return { ...g, members: [...members, contact.id] };
          }
          return g;
        });
        saveGroups(adjustedGroups);
        setMessage('Contact moved');
        setTimeout(()=>setMessage(''),1500);
      };

    const existing = user.data.contacts || [];
    const filtered = existing.filter(c => c.id !== contactId);
    updateUserData({ contacts: filtered });
    // Remove from any group membership
    const updatedGroups = groups.map(g => ({ ...g, members: (g.members||[]).filter(m => m !== contactId) }));
    saveGroups(updatedGroups);
  };

  const groupMembers = selectedGroup ? (user.data.contacts||[]).filter(c => (selectedGroup.members||[]).includes(c.id)) : [];
  const availableContacts = selectedGroup ? (user.data.contacts||[]).filter(c => !(selectedGroup.members||[]).includes(c.id)) : [];

  const contacts = user.data.contacts || [];

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar role="client" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Contacts & Groups</h1>
              <p className="text-gray-600 mt-1">Organize your contacts into reusable sending groups</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                + Add Contact
              </button>
              {!showMembers && (
                <button
                  onClick={() => setShowMembers(false)}
                  className="bg-fuchsia-600 text-white px-6 py-2 rounded-lg hover:bg-fuchsia-700 transition"
                >
                  Groups
                </button>
              )}
            </div>
          </div>

          {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{message}</div>}

          {!showMembers ? (
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">{groupForm.id ? 'Edit Group' : 'Create Group'}</h2>
                <form onSubmit={createOrUpdateGroup} className="space-y-3">
                  <input className="w-full border rounded px-3 py-2" placeholder="Group Name" value={groupForm.name} onChange={(e)=>setGroupForm({...groupForm,name:e.target.value})} required />
                  <input className="w-full border rounded px-3 py-2" placeholder="Description" value={groupForm.description} onChange={(e)=>setGroupForm({...groupForm,description:e.target.value})} />
                  <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded">{groupForm.id ? 'Update' : 'Create'}</button>
                    {groupForm.id && <button type="button" onClick={()=>setGroupForm({id:null,name:'',description:''})} className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded">Cancel</button>}
                  </div>
                </form>
              </div>
              <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Groups ({groups.length})</h2>
                <div className="space-y-2 max-h-72 overflow-auto">
                  {groups.map(g => (
                    <div key={g.id} className="p-3 border rounded hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-semibold">{g.name}</div>
                          <div className="text-sm text-gray-600">{(g.members||[]).length} members • {g.description || 'No description'}</div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={()=>{setSelectedGroup(g);setShowMembers(true);}} className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                          <button onClick={()=>editGroup(g)} className="text-green-600 hover:text-green-700 text-sm">Edit</button>
                          <button onClick={()=>deleteGroup(g.id)} className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {groups.length === 0 && <p className="text-gray-500 text-center py-4">No groups yet. Create one.</p>}
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-10">
              <button onClick={()=>setShowMembers(false)} className="mb-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded">← Back to Groups</button>
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-xl font-bold mb-2">{selectedGroup.name}</h2>
                <p className="text-gray-600 mb-4">{selectedGroup.description}</p>
                <div className="text-sm text-gray-700">Members: {(selectedGroup.members||[]).length}</div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">Current Members</h3>
                  <div className="space-y-2 max-h-96 overflow-auto">
                    {groupMembers.map(c => (
                      <div key={c.id} className="p-3 border rounded flex justify-between items-center hover:bg-gray-50">
                        <div>
                          <div className="font-semibold">{c.name}</div>
                          <div className="text-sm text-gray-600">{c.phone}</div>
                        </div>
                        <button onClick={()=>removeMember(c.id)} className="text-red-600 hover:text-red-700 text-sm">Remove</button>
                      </div>
                    ))}
                    {groupMembers.length === 0 && <p className="text-gray-500 text-center py-4">No members yet</p>}
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">Add Members</h3>
                  <div className="space-y-2 max-h-96 overflow-auto">
                    {availableContacts.map(c => (
                      <div key={c.id} className="p-3 border rounded flex justify-between items-center hover:bg-gray-50">
                        <div>
                          <div className="font-semibold">{c.name}</div>
                          <div className="text-sm text-gray-600">{c.phone}</div>
                        </div>
                        <button onClick={()=>addMember(c.id)} className="text-green-600 hover:text-green-700 text-sm">Add</button>
                      </div>
                    ))}
                    {availableContacts.length === 0 && <p className="text-gray-500 text-center py-4">All contacts already members</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contacts ({contacts.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <div key={contact.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{contact.name}</h3>
                  <p className="text-gray-600 mb-1">📱 {contact.phone}</p>
                  <div className="mb-2">
                    <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Group</label>
                    <select
                      value={contact.group}
                      onChange={(e)=>handleQuickGroupChange(contact, e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-fuchsia-600"
                    >
                      {groups.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
                      {groups.length === 0 && <option value="Ungrouped">Ungrouped</option>}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition text-sm">Send SMS</button>
                    <button onClick={()=>openEditContact(contact)} className="flex-1 bg-fuchsia-600 text-white py-2 rounded hover:bg-fuchsia-700 transition text-sm">Edit</button>
                    <button onClick={()=>handleDeleteContact(contact.id)} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition text-sm">Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg">No contacts yet. Add your first contact!</p>
              </div>
            )}
          </div>

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
                  <div className="mb-6">
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
                  <div className="flex gap-4">
                    <button type="submit" className="flex-1 bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition">Add</button>
                    <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-300 text-gray-800 font-bold py-2 rounded hover:bg-gray-400 transition">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showEditModal && editContact && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Contact</h2>
                <form onSubmit={handleUpdateContact}>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Name</label>
                    <input
                      type="text"
                      value={editContact.name}
                      onChange={(e) => setEditContact({ ...editContact, name: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-fuchsia-600"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      value={editContact.phone}
                      onChange={(e) => setEditContact({ ...editContact, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-fuchsia-600"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Group</label>
                    <select
                      value={editContact.group}
                      onChange={(e) => setEditContact({ ...editContact, group: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-fuchsia-600"
                    >
                      {groups.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
                      {groups.length === 0 && <option value="Ungrouped">Ungrouped</option>}
                    </select>
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" className="flex-1 bg-fuchsia-600 text-white font-bold py-2 rounded hover:bg-fuchsia-700 transition">Save</button>
                    <button type="button" onClick={() => { setShowEditModal(false); setEditContact(null); }} className="flex-1 bg-gray-300 text-gray-800 font-bold py-2 rounded hover:bg-gray-400 transition">Cancel</button>
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
