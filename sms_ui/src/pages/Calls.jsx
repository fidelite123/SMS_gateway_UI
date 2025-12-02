import { useState } from 'react'
import { mockCalls } from '../mockData'
import { useStore } from '../store'

export default function Calls() {
  const { sidebarOpen } = useStore()
  const [calls] = useState(mockCalls)
  const [filter, setFilter] = useState('all')

  const filteredCalls = filter === 'all' ? calls : calls.filter(c => c.status === filter)

  return (
    <div className={`${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300 p-8 pt-4`}>
      <h1 className="text-3xl font-bold mb-6">Calls</h1>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6">
        {['all', 'completed', 'missed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg capitalize transition ${
              filter === f ? 'btn btn-primary' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Calls Table */}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-4">Caller</th>
              <th className="text-left p-4">Receiver</th>
              <th className="text-left p-4">Duration</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Type</th>
              <th className="text-left p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCalls.map((call) => (
              <tr key={call.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 font-medium">{call.caller}</td>
                <td className="p-4">{call.receiver}</td>
                <td className="p-4">{call.duration}m</td>
                <td className="p-4">{call.date}</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    {call.type}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    call.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {call.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
