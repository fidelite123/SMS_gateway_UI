import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/common/Sidebar';
import { parsePhoneNumberFromString, getCountries, getCountryCallingCode } from 'libphonenumber-js';

export default function SendSMS() {
  const { user, addLog, updateUserData } = useAuth();
  const [sendType, setSendType] = useState('single');
  const [country, setCountry] = useState('RW');
  const [invalidList, setInvalidList] = useState([]);
  const [recipients, setRecipients] = useState('');
  const [message, setMessage] = useState('');
  const [senderId, setSenderId] = useState('WeCall');
  const [messageType, setMessageType] = useState('gsm');
  const [scheduleTime, setScheduleTime] = useState('');
  const [creditPreview, setCreditPreview] = useState(0);

  if (!user) return <div>Loading...</div>;

  // Helper: list of country options for the dropdown
  // helper: convert ISO country code to flag emoji
  const flagFromCountryCode = (c) => {
    if (!c || c.length !== 2) return '';
    // convert ASCII letters to regional indicator symbols
    return c.toUpperCase().replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
  };

  const countryOptions = useMemo(() => {
    try {
      const regionNames = typeof Intl !== 'undefined' && Intl.DisplayNames
        ? new Intl.DisplayNames(['en'], { type: 'region' })
        : null;

      return getCountries().map((c) => ({
        code: c,
        dial: getCountryCallingCode(c),
        name: regionNames ? regionNames.of(c) : c,
        flag: flagFromCountryCode(c),
      }));
    } catch (e) {
      // fallback minimal set
      return [
        { code: 'RW', dial: '250', name: 'Rwanda', flag: flagFromCountryCode('RW') },
        { code: 'US', dial: '1', name: 'United States', flag: flagFromCountryCode('US') },
        { code: 'GB', dial: '44', name: 'United Kingdom', flag: flagFromCountryCode('GB') },
      ];
    }
  }, []);

  const calculateCredits = () => {
    if (!message) return 0;
    const msgLength = message.length;
    const isUnicode = messageType === 'unicode';
    const charsPerSms = isUnicode ? 70 : 160;
    const recipientCount = recipients
      .split(/[,\n]/)
      .map(r => r.trim())
      .filter(r => r)
      .map(r => {
        const parsed = r.startsWith('+') ? parsePhoneNumberFromString(r) : parsePhoneNumberFromString(r, country);
        return parsed && parsed.isValid() ? parsed.number : null;
      })
      .filter(Boolean)
      .length;
    
    const smsCount = Math.ceil(msgLength / charsPerSms);
    return (smsCount * recipientCount * 0.05).toFixed(2);
  };

  // Validation/parsing now uses libphonenumber-js; we accept E.164 or parse with the selected country.

  const handleSendSMS = (e) => {
    e.preventDefault();
    const cost = parseFloat(calculateCredits());

    if (cost > user.data.walletBalance) {
      alert('Insufficient wallet balance');
      return;
    }

    // Parse recipients, sanitize and validate each number using libphonenumber-js
    const recipientList = recipients
      .split(/[,\n]/)
      .map(r => r.trim())
      .filter(r => r);
    const invalid = [];
    const validParsed = [];

    recipientList.forEach(r => {
      // if starts with +, treat as full E.164 input, otherwise parse using selected country
      const parsed = r.startsWith('+') ? parsePhoneNumberFromString(r) : parsePhoneNumberFromString(r, country);
      if (parsed && parsed.isValid()) validParsed.push(parsed.number);
      else invalid.push(r);
    });

    const digitsRecipients = Array.from(new Set(validParsed));

    // cost is computed for valid recipients only; addLog should show per-recipient cost
    const msgLength = message.length;
    const charsPerSms = messageType === 'unicode' ? 70 : 160;
    const smsCount = Math.max(1, Math.ceil(msgLength / charsPerSms));
    const costPerSms = 0.05; // same rate used in calculateCredits
    const costPerRecipient = parseFloat((smsCount * costPerSms).toFixed(2));
    const totalCost = parseFloat((costPerRecipient * digitsRecipients.length).toFixed(2));

    if (totalCost > user.data.walletBalance) {
      alert('Insufficient wallet balance for the selected recipients and message length');
      return;
    }

    // Deduct wallet balance and update user data (only for valid recipients)
    const newBalance = parseFloat((user.data.walletBalance - totalCost).toFixed(2));
    updateUserData({ walletBalance: newBalance, smsSentToday: (user.data.smsSentToday || 0) + (smsCount * digitsRecipients.length) });

    // Add logs per valid recipient (delivered)
    digitsRecipients.forEach(recipient => {
      addLog({ recipient: recipient.trim(), message, status: 'delivered', cost: costPerRecipient, senderId });
    });

    // Add logs for invalid recipients (failed, no cost)
    invalid.forEach(bad => addLog({ recipient: bad, message, status: 'failed', cost: 0, senderId }));

    // expose invalid numbers in the UI so the client sees which ones failed
    setInvalidList(invalid);

    const failedCount = invalid.length;
    let summary = `Sent to ${digitsRecipients.length} recipient(s)`;
    if (failedCount > 0) summary += `. Failed ${failedCount} invalid number(s)`;
    alert(summary);
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
        .map(line => line.split(',')[0].trim())
        // try parsing with phone library and selected country when missing +
        .map(n => {
          const parsed = n && n.startsWith('+') ? parsePhoneNumberFromString(n) : parsePhoneNumberFromString(n, country);
          return parsed && parsed.isValid() ? parsed.number : null;
        })
        .filter(Boolean)
        .join('\n');
      
      setRecipients(numbers);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
                    <div className="mb-3 flex items-center gap-3">
                      <label className="text-sm text-gray-700 font-medium">Country</label>
                        <select value={country} onChange={e => setCountry(e.target.value)} className="border px-3 py-2 rounded-lg">
                          {countryOptions.map(c => (
                            <option key={c.code} value={c.code}>{c.name} (+{c.dial})</option>
                          ))}
                        </select>
                    </div>
                    {sendType === 'bulk' ? (
                      <div className="mb-4">
                        <input
                          type="file"
                          accept=".csv,.xlsx,.txt"
                          onChange={handleBulkUpload}
                          className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-blue-500 transition cursor-pointer"
                        />
                        <p className="text-sm text-gray-500 mt-2">Or paste numbers below (one per line)</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="px-3 py-2 border border-gray-300 rounded-l-lg bg-gray-50 text-sm text-gray-700">+{(countryOptions.find(c => c.code === country) || {}).dial || ''}</div>
                        <input
                          type="text"
                          value={recipients}
                          onChange={(e) => setRecipients(e.target.value)}
                          placeholder={"Phone number (without + or with +)"}
                          className="flex-1 border border-gray-300 rounded-r-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                          required
                        />
                      </div>
                    )}
                    <p className="text-sm text-gray-500 mt-2">Recipients: {recipients.split(/[,\n]/).filter(r => r.trim()).length}</p>

                    {/* Inline feedback for invalid numbers */}
                    {invalidList && invalidList.length > 0 && (
                      <div className="mt-3 bg-red-50 border border-red-200 text-red-800 p-3 rounded">
                        <div className="font-semibold mb-1">⚠️ Some numbers were invalid and not sent</div>
                        <ul className="text-sm list-disc list-inside max-h-32 overflow-auto">
                          {invalidList.map((n, idx) => (
                            <li key={idx}>{n}</li>
                          ))}
                        </ul>
                        <div className="mt-2 text-xs text-red-700">Fix the numbers and send again.</div>
                      </div>
                    )}
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
                  <li>✓ Numbers will be validated against the selected country (invalid numbers won't be sent)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
