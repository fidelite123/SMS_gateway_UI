import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/common/Sidebar';

export default function ResellerSendSMS() {
  const { user, sendSMSForClient } = useAuth();
  const [selectedClient, setSelectedClient] = useState('');
  const [recipients, setRecipients] = useState('');
  const [message, setMessage] = useState('');
  const [senderId, setSenderId] = useState('WeCall');
  const [messageType, setMessageType] = useState('gsm');
  const [creditPreview, setCreditPreview] = useState(0);

  if (!user) return <div>Loading...</div>;

  const clients = user.data.clients || [];
  const client = clients.find(c => c.id === parseInt(selectedClient));

  const calculateCredits = () => {
    if (!message) return 0;
    const msgLength = message.length;
    const isUnicode = messageType === 'unicode';
    const charsPerSms = isUnicode ? 70 : 160;
    const recipientCount = recipients
      .split(/[,\n]/)
      .filter(r => r.trim())
      .length;
    
    const smsCount = Math.ceil(msgLength / charsPerSms);
    return (smsCount * recipientCount * 0.03).toFixed(2); // Reseller rate
  };

  const handleSendSMS = (e) => {
    e.preventDefault();
    
    if (!selectedClient) {
      alert('Please select a client');
      return;
    }

    const cost = parseFloat(calculateCredits());
    const clientWallet = client?.walletBalance || 0;

    if (cost > clientWallet) {
      alert('Client has insufficient wallet balance');
      return;
    }

    const recipientList = recipients
      .split(/[,\n]/)
      .map(r => r.trim())
      .filter(r => r);

    try {
      const result = sendSMSForClient({
        clientId: selectedClient,
        recipients: recipientList,
        message,
        senderId,
        messageType,
        costPerSms: 0.03,
      });

      alert(`SMS sent to ${result.recipientCount} recipient(s). Total cost: $${result.totalCost.toFixed(2)}`);
    } catch (err) {
      alert(err.message || 'Failed to send SMS');
      return;
    }
    setRecipients('');
    setMessage('');
    setSelectedClient('');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="reseller" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Send SMS on Behalf of Client</h1>
            <p className="text-gray-600 mt-1">Manage your clients' SMS campaigns</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                <form onSubmit={handleSendSMS} className="space-y-6">
                  {/* Client Selection */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Select Client *</label>
                    <select
                      value={selectedClient}
                      onChange={(e) => setSelectedClient(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                      required
                    >
                      <option value="">-- Choose a client --</option>
                      {clients.filter(c => c.status === 'active').map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name} (Balance: ${c.walletBalance?.toFixed(2)})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sender ID */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Sender ID</label>
                    <select
                      value={senderId}
                      onChange={(e) => setSenderId(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    >
                      <option value="WeCall">WeCall</option>
                      <option value="MyBusiness">My Business</option>
                      <option value="Support">Support</option>
                    </select>
                  </div>

                  {/* Recipients */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Recipients (paste or upload)</label>
                    <textarea
                      value={recipients}
                      onChange={(e) => setRecipients(e.target.value)}
                      placeholder="+1234567890&#10;+0987654321&#10;+1111111111"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                      rows="6"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Recipients: {recipients.split(/[,\n]/).filter(r => r.trim()).length}
                    </p>
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="block text-gray-700 font-semibold">Message</label>
                      <span className="text-sm text-gray-500">{message.length} characters</span>
                    </div>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter your message"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                      rows="4"
                      required
                    />
                  </div>

                  {/* Message Type */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Message Type</label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="gsm"
                          checked={messageType === 'gsm'}
                          onChange={(e) => setMessageType(e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-gray-700">GSM (160 chars)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="unicode"
                          checked={messageType === 'unicode'}
                          onChange={(e) => setMessageType(e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-gray-700">Unicode (70 chars)</span>
                      </label>
                    </div>
                  </div>

                  {/* Send Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition"
                  >
                    📤 Send SMS
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar - Preview & Credits */}
            <div className="space-y-6">
              {/* Credit Preview */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">💰 Reseller Rate</h3>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-2">Cost per SMS: $0.03</p>
                  <p className="text-sm text-gray-600 mb-2">
                    Message length: {message.length} chars
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Estimated SMS: {Math.ceil(message.length / (messageType === 'unicode' ? 70 : 160))}
                  </p>
                  <div className="border-t pt-3 mt-3">
                    <p className="text-xs text-gray-500">Total Cost</p>
                    <p className="text-3xl font-bold text-blue-600">${calculateCredits()}</p>
                  </div>
                </div>
              </div>

              {/* Client Balance */}
              {client && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">👤 Client Balance</h3>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">{client.name}</p>
                    <p className="text-2xl font-bold text-green-600 mb-3">${client.walletBalance?.toFixed(2)}</p>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>SMS Sent: {client.smsSent || 0}</p>
                      <p>Delivery: {client.deliveryRate || 0}%</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Message Preview */}
              {message && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">📝 Message Preview</h3>
                  <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-800 break-words">
                    {message}
                  </div>
                </div>
              )}

              {/* Quick Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-3">💡 Quick Tips</h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>✓ Reseller rate is $0.03/SMS</li>
                  <li>✓ Check client balance before sending</li>
                  <li>✓ Include country code in numbers</li>
                  <li>✓ One line = one recipient</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
