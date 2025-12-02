import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';

const LS_GROUPS_KEY = 'admin_contact_groups';
const LS_ADMIN_CONTACTS_KEY = 'admin_custom_contacts';

export default function AdminContacts() {
  const { allUsers } = useAuth();
  const [groupForm, setGroupForm] = useState({ id: null, name: '', description: '' });
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [customContacts, setCustomContacts] = useState([]);
  const [contactForm, setContactForm] = useState({ id: null, name: '', email: '', phone: '', group: '' });
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState('');
  const [showMembers, setShowMembers] = useState(false);

  // Base contacts are client users + admin-created lightweight contacts
  const userContacts = (allUsers() || []).filter(u => u.role === 'client').map(c => ({
    id: c.id,
    name: c.profile?.name || c.email,
    email: c.email,
    phone: c.profile?.phone || '',
    source: 'user'
  }));
  const allContacts = [...userContacts, ...customContacts];

  useEffect(() => {
    const savedGroups = localStorage.getItem(LS_GROUPS_KEY);
    if (savedGroups) {
      try { setGroups(JSON.parse(savedGroups)); } catch {}
    }
    const savedContacts = localStorage.getItem(LS_ADMIN_CONTACTS_KEY);
    if (savedContacts) {
      try { setCustomContacts(JSON.parse(savedContacts)); } catch {}
    }
  }, []);

  const saveCustomContacts = (list) => {
    setCustomContacts(list);
    localStorage.setItem(LS_ADMIN_CONTACTS_KEY, JSON.stringify(list));
  };

  const saveGroups = (newGroups) => {
    setGroups(newGroups);
    localStorage.setItem(LS_GROUPS_KEY, JSON.stringify(newGroups));
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
    setTimeout(() => setMessage(''), 2000);
  };

  const editGroup = (g) => {
    setGroupForm({ id: g.id, name: g.name, description: g.description });
  };

  const deleteGroup = (id) => {
    if (!confirm('Delete this group?')) return;
    saveGroups(groups.filter(g => g.id !== id));
    setMessage('Group deleted');
    setTimeout(() => setMessage(''), 2000);
  };

  const viewMembers = (g) => {
    setSelectedGroup(g);
    setShowMembers(true);
  };

  const addMember = (contactId) => {
    if (!selectedGroup) return;
    const updated = groups.map(g => {
      if (g.id === selectedGroup.id) {
        const members = g.members || [];
        if (!members.includes(contactId)) {
          return { ...g, members: [...members, contactId] };
        }
      }
      return g;
    });
    saveGroups(updated);
    setSelectedGroup(updated.find(g => g.id === selectedGroup.id));
  };

  const removeMember = (contactId) => {
    if (!selectedGroup) return;
    const updated = groups.map(g => {
      if (g.id === selectedGroup.id) {
        return { ...g, members: (g.members || []).filter(m => m !== contactId) };
      }
      return g;
    });
    saveGroups(updated);
    setSelectedGroup(updated.find(g => g.id === selectedGroup.id));
  };

  // Enforce single-group membership: a contact belongs to at most one group.
  const contactGroupMap = groups.reduce((acc, g) => {
    (g.members || []).forEach(m => { acc[m] = g.id; });
    return acc;
  }, {});
  const groupMembers = selectedGroup ? allContacts.filter(c => (selectedGroup.members || []).includes(c.id)) : [];
  const availableContacts = selectedGroup ? allContacts.filter(c => !(selectedGroup.members || []).includes(c.id)) : [];

  const moveContactToGroup = (contactId, targetGroupId) => {
    const updated = groups.map(g => {
      // Remove from any group first
      const filteredMembers = (g.members || []).filter(m => m !== contactId);
      if (g.id === targetGroupId) {
        return { ...g, members: [...filteredMembers, contactId] };
      }
      return { ...g, members: filteredMembers };
    });
    saveGroups(updated);
    setMessage('Contact moved');
    setTimeout(()=>setMessage(''),1500);
  };

  const startCreateContact = () => {
    setContactForm({ id: null, name: '', email: '', phone: '', group: groups[0]?.id || '' });
    setShowContactForm(true);
  };

  const editContact = (contact) => {
    // Determine current group id via map
    const currentGroupId = contactGroupMap[contact.id] || '';
    setContactForm({ id: contact.id, name: contact.name, email: contact.email, phone: contact.phone, group: currentGroupId });
    setShowContactForm(true);
  };

  const submitContact = (e) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim()) return;
    if (contactForm.id) {
      // update existing custom contact
      const updatedList = customContacts.map(c => c.id === contactForm.id ? { ...c, name: contactForm.name, email: contactForm.email, phone: contactForm.phone } : c);
      saveCustomContacts(updatedList);
      moveContactToGroup(contactForm.id, contactForm.group); // ensure group reassignment
      setMessage('Contact updated');
    } else {
      const newId = 'c-' + Date.now();
      const newContact = { id: newId, name: contactForm.name, email: contactForm.email, phone: contactForm.phone, source: 'custom' };
      saveCustomContacts([...customContacts, newContact]);
      if (contactForm.group) moveContactToGroup(newId, contactForm.group);
      setMessage('Contact created');
    }
    setShowContactForm(false);
    setContactForm({ id: null, name: '', email: '', phone: '', group: '' });
    setTimeout(()=>setMessage(''),2000);
  };

  const deleteContact = (contactId) => {
    const existsCustom = customContacts.find(c => c.id === contactId);
    if (!existsCustom) {
      alert('Cannot delete system user contact');
      return;
    }
    if (!confirm('Delete this contact?')) return;
    saveCustomContacts(customContacts.filter(c => c.id !== contactId));
    // Remove from any group
    saveGroups(groups.map(g => ({ ...g, members: (g.members||[]).filter(m => m !== contactId) })));
    setMessage('Contact deleted');
    setTimeout(()=>setMessage(''),1500);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Contacts & Groups</h1>

        {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{message}</div>}

        {!showMembers ? (
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">{groupForm.id ? 'Edit Group' : 'Create Group'}</h2>
                <form onSubmit={createOrUpdateGroup} className="space-y-3">
                  <input className="w-full border rounded px-3 py-2" placeholder="Group Name" value={groupForm.name} onChange={(e)=>setGroupForm({...groupForm,name:e.target.value})} required />
                  <input className="w-full border rounded px-3 py-2" placeholder="Description" value={groupForm.description} onChange={(e)=>setGroupForm({...groupForm,description:e.target.value})} />
                  <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded">{groupForm.id ? 'Update' : 'Create'}</button>
                    {groupForm.id && <button type="button" onClick={()=>setGroupForm({id:null,name:'',description:''})} className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded">Cancel</button>}
                  </div>
                </form>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Groups ({groups.length})</h2>
                <div className="space-y-2 max-h-96 overflow-auto">
                  {groups.map(g => (
                    <div key={g.id} className="p-3 border rounded hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-semibold">{g.name}</div>
                          <div className="text-sm text-gray-600">{(g.members || []).length} contacts • {g.description || 'No description'}</div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={()=>viewMembers(g)} className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                          <button onClick={()=>editGroup(g)} className="text-green-600 hover:text-green-700 text-sm">Edit</button>
                          <button onClick={()=>deleteGroup(g.id)} className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {groups.length === 0 && <p className="text-gray-500 text-center py-4">No groups yet. Create one above.</p>}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">All Contacts ({allContacts.length})</h2>
                <button onClick={startCreateContact} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">+ Add Contact</button>
              </div>
              <div className="overflow-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Phone</th>
                      <th className="px-4 py-2 text-left">Group</th>
                      <th className="px-4 py-2 text-left">Source</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allContacts.map(c => {
                      const currentGroupId = contactGroupMap[c.id] || '';
                      return (
                        <tr key={c.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">{c.name}</td>
                          <td className="px-4 py-2">{c.email}</td>
                          <td className="px-4 py-2">{c.phone || '-'}</td>
                          <td className="px-4 py-2">
                            <select value={currentGroupId} onChange={(e)=>moveContactToGroup(c.id, e.target.value)} className="border rounded px-2 py-1 text-xs">
                              <option value="">None</option>
                              {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                            </select>
                          </td>
                          <td className="px-4 py-2 capitalize">{c.source}</td>
                          <td className="px-4 py-2 flex gap-2">
                            {c.source === 'custom' && <button onClick={()=>editContact(c)} className="text-fuchsia-600 hover:text-fuchsia-700">Edit</button>}
                            {c.source === 'custom' && <button onClick={()=>deleteContact(c.id)} className="text-red-600 hover:text-red-700">Delete</button>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            {showContactForm && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                  <h3 className="text-lg font-semibold mb-4">{contactForm.id ? 'Edit Contact' : 'Add Contact'}</h3>
                  <form onSubmit={submitContact} className="space-y-3">
                    <input className="w-full border rounded px-3 py-2" placeholder="Name" value={contactForm.name} onChange={(e)=>setContactForm({...contactForm,name:e.target.value})} required />
                    <input className="w-full border rounded px-3 py-2" placeholder="Email" type="email" value={contactForm.email} onChange={(e)=>setContactForm({...contactForm,email:e.target.value})} required />
                    <input className="w-full border rounded px-3 py-2" placeholder="Phone" value={contactForm.phone} onChange={(e)=>setContactForm({...contactForm,phone:e.target.value})} />
                    <select className="w-full border rounded px-3 py-2" value={contactForm.group} onChange={(e)=>setContactForm({...contactForm,group:e.target.value})}>
                      <option value="">No Group</option>
                      {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                    </select>
                    <div className="flex gap-2 pt-2">
                      <button type="submit" className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded">{contactForm.id ? 'Save' : 'Create'}</button>
                      <button type="button" onClick={()=>{setShowContactForm(false); setContactForm({id:null,name:'',email:'',phone:'',group:''});}} className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        ) : (
          <div>
            <button onClick={()=>setShowMembers(false)} className="mb-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded">← Back to Groups</button>
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h2 className="text-xl font-bold mb-2">{selectedGroup.name}</h2>
              <p className="text-gray-600 mb-4">{selectedGroup.description}</p>
              <div className="text-sm text-gray-700">Members: {(selectedGroup.members || []).length}</div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Current Members</h3>
                <div className="space-y-2 max-h-96 overflow-auto">
                  {groupMembers.map(c => (
                    <div key={c.id} className="p-3 border rounded flex justify-between items-center hover:bg-gray-50">
                      <div>
                        <div className="font-semibold">{c.profile?.name || c.email}</div>
                        <div className="text-sm text-gray-600">{c.email}</div>
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
                        <div className="font-semibold">{c.profile?.name || c.email}</div>
                        <div className="text-sm text-gray-600">{c.email}</div>
                      </div>
                      <button onClick={()=>addMember(c.id)} className="text-green-600 hover:text-green-700 text-sm">Add</button>
                    </div>
                  ))}
                  {availableContacts.length === 0 && <p className="text-gray-500 text-center py-4">All contacts are already members</p>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
