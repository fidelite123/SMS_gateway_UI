import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/common/Sidebar';

export default function ResellerSMSLogs() {
  const { user } = useAuth();
  const [filterStatus, setFilterStatus] = useState('all');

  if (!user) return <div>Loading...</div>;

  const logs = user.data.logs || [];
  const filteredLogs = filterStatus === 'all' ? logs : logs.filter(log => log.status === filterStatus);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="reseller" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">SMS Logs</h1>
            <p className="text-gray-600 mt-1">View all SMS sent through your reseller account</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6 flex gap-4">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded ${filterStatus === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} transition`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('delivered')}
                className={`px-4 py-2 rounded ${filterStatus === 'delivered' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'} transition`}
              >
                Delivered
              </button>
              <button
                onClick={() => setFilterStatus('pending')}
                className={`px-4 py-2 rounded ${filterStatus === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'} transition`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilterStatus('failed')}
                className={`px-4 py-2 rounded ${filterStatus === 'failed' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'} transition`}
              >
                Failed
              </button>
            </div>

            {filteredLogs.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Recipient</th>
                      <th className="px-4 py-3 text-left">Message</th>
                      <th className="px-4 py-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">{log.date}</td>
                        <td className="px-4 py-3">{log.recipient}</td>
                        <td className="px-4 py-3 truncate">{log.message}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            log.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            log.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No SMS logs found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
