import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/common/Sidebar';

export default function SendSMS() {
  const { user, addLog } = useAuth();
  const [sendType, setSendType] = useState('single');
  const [recipients, setRecipients] = useState('');
  const [message, setMessage] = useState('');
  const [senderId, setSenderId] = useState('WeCall');
  const [messageType, setMessageType] = useState('gsm');
  const [scheduleTime, setScheduleTime] = useState('');
  const [creditPreview, setCreditPreview] = useState(0);

  if (!user) return <div>Loading...</div>;

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
    return (smsCount * recipientCount * 0.05).toFixed(2);
  };

  const handleSendSMS = (e) => {
    e.preventDefault();
    const cost = parseFloat(calculateCredits());

    if (cost > user.data.walletBalance) {
      alert('Insufficient wallet balance');
      return;
    }

    const recipientList = recipients
      .split(/[,\n]/)
      .filter(r => r.trim());

    recipientList.forEach(recipient => {
      addLog({
        recipient: recipient.trim(),
        message,
        status: 'delivered',
        cost,
        senderId,
      });
    });

    alert(`SMS sent to ${recipientList.length} recipient(s)`);
    setRecipients('');
    setMessage('');
  };

  const handleBulkUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n');
      const numbers = lines
        .filter(line => line.trim())
        .map(line => line.split(',')[0])
        .filter(num => num.match(/^\+?[0-9]{10,}/))
        .join('\n');
      
      setRecipients(numbers);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="client" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Send SMS</h1>
            <p className="text-gray-600 mt-1">Send messages to your contacts</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6">
                {/* Send Type Tabs */}
                <div className="flex gap-4 mb-6 border-b">
                  <button
                    onClick={() => setSendType('single')}
                    className={`pb-3 px-4 font-semibold transition ${
                      sendType === 'single'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    📱 Single SMS
                  </button>
                  <button
                    onClick={() => setSendType('bulk')}
                    className={`pb-3 px-4 font-semibold transition ${
                      sendType === 'bulk'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    📤 Bulk SMS
                  </button>
                  <button
                    onClick={() => setSendType('scheduled')}
                    className={`pb-3 px-4 font-semibold transition ${
                      sendType === 'scheduled'
                        ? 'border-b-2 border-blue-500 text-blue-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    ⏰ Scheduled
                  </button>
                </div>

                <form onSubmit={handleSendSMS} className="space-y-6">
                  {/* Sender ID */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Sender ID</label>
                    <select
                      value={senderId}
                      onChange={(e) => setSenderId(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    >
                      <option value="WeCall">WeCall (Default)</option>
                      <option value="MyBusiness">My Business</option>
                      <option value="Support">Support</option>
                      <option value="Alert">Alert</option>
                    </select>
                  </div>

                  {/* Recipients */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      {sendType === 'bulk' ? 'Recipients (Upload or Paste)' : 'Recipient Number'}
                    </label>
                    {sendType === 'bulk' && (
                      <div className="mb-4">
                        <input
                          type="file"
                          accept=".csv,.xlsx,.txt"
                          onChange={handleBulkUpload}
                          className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-blue-500 transition cursor-pointer"
                        />
                        <p className="text-sm text-gray-500 mt-2">Or paste numbers below (one per line)</p>
                      </div>
                    )}
                    <textarea
                      value={recipients}
                      onChange={(e) => setRecipients(e.target.value)}
                      placeholder={sendType === 'bulk' ? "+1234567890\n+0987654321\n+1111111111" : "+1234567890"}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                      rows={sendType === 'bulk' ? 6 : 2}
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

                  {/* Scheduled SMS */}
                  {sendType === 'scheduled' && (
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Schedule For</label>
                      <input
                        type="datetime-local"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                  )}

                  {/* Send Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition"
                  >
                    {sendType === 'scheduled' ? '⏰ Schedule SMS' : '📤 Send SMS'}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar - Preview & Credits */}
            <div className="space-y-6">
              {/* Credit Preview */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">💰 Credit Preview</h3>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-2">Cost per SMS: $0.05</p>
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

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Available Balance</p>
                  <p className="text-2xl font-bold text-green-600">${user.data.walletBalance.toFixed(2)}</p>
                </div>
              </div>

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
                  <li>✓ Use {messageType === 'unicode' ? '70' : '160'} characters per SMS</li>
                  <li>✓ Include country code (+1, +44, etc.)</li>
                  <li>✓ Longer messages cost more credits</li>
                  <li>✓ Numbers must be valid format</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
