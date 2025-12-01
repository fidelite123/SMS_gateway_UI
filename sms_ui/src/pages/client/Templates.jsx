import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/common/Sidebar';

export default function SMSTemplates() {
  const { user } = useAuth();
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'OTP Template',
      category: 'OTP',
      content: 'Your OTP is {{otp}}. Valid for 10 minutes.',
      variables: ['otp'],
      createdDate: '2025-11-01',
    },
    {
      id: 2,
      name: 'Welcome Message',
      category: 'Onboarding',
      content: 'Welcome {{name}}! Thanks for joining us. Start exploring now!',
      variables: ['name'],
      createdDate: '2025-11-15',
    },
  ]);
  const [showNewModal, setShowNewModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: 'General', content: '' });

  if (!user) return <div>Loading...</div>;

  const handleCreateTemplate = (e) => {
    e.preventDefault();
    const variables = (formData.content.match(/\{\{(\w+)\}\}/g) || []).map(v =>
      v.replace(/[{}]/g, '')
    );

    const newTemplate = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      content: formData.content,
      variables,
      createdDate: new Date().toISOString().split('T')[0],
    };

    setTemplates([...templates, newTemplate]);
    setFormData({ name: '', category: 'General', content: '' });
    setShowNewModal(false);
  };

  const deleteTemplate = (id) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar role="client" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">SMS Templates</h1>
              <p className="text-gray-600 mt-1">Create and manage message templates</p>
            </div>
            <button
              onClick={() => setShowNewModal(true)}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              + New Template
            </button>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map(template => (
              <div key={template.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{template.name}</h3>
                    <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-800 mt-2">
                      {template.category}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-100 rounded p-4 mb-4 text-sm text-gray-700 break-words max-h-24 overflow-y-auto">
                  {template.content}
                </div>

                {template.variables.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Variables:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.variables.map((v, i) => (
                        <span key={i} className="px-2 py-1 rounded text-xs bg-purple-100 text-purple-800">
                          {`{{${v}}}`}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-xs text-gray-500 mb-4">
                  Created: {template.createdDate}
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 text-blue-500 hover:bg-blue-50 py-2 rounded transition border border-blue-500 text-sm">
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTemplate(template.id)}
                    className="flex-1 text-red-500 hover:bg-red-50 py-2 rounded transition border border-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Template Guide */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">💡 Template Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Using Variables</h4>
                <p className="text-sm text-blue-800 mb-3">
                  Use double curly braces {'{{variable}}'} to add dynamic content:
                </p>
                <div className="bg-white p-3 rounded text-sm font-mono text-gray-700 mb-2">
                  Hi {'{{'}'name{'}}'}, your code is {'{{'}'otp{'}}'}.
                </div>
                <p className="text-xs text-blue-700">
                  Variables are auto-detected from your template
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Common Templates</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✓ OTP & Verification codes</li>
                  <li>✓ Welcome & Onboarding</li>
                  <li>✓ Appointment reminders</li>
                  <li>✓ Promotional messages</li>
                  <li>✓ Order updates</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Create Template Modal */}
          {showNewModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Template</h2>
                <form onSubmit={handleCreateTemplate}>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Template Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="e.g., OTP Template"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                    >
                      <option value="General">General</option>
                      <option value="OTP">OTP & Verification</option>
                      <option value="Onboarding">Onboarding</option>
                      <option value="Promotional">Promotional</option>
                      <option value="Reminders">Reminders</option>
                      <option value="Updates">Updates</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Message Content</label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
                      placeholder="Enter message content. Use {{variable}} for dynamic content."
                      rows="5"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Character count: {formData.content.length}
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition"
                    >
                      Create Template
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewModal(false)}
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
